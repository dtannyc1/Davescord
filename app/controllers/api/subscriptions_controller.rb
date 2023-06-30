class Api::SubscriptionsController < ApplicationController
    before_action(:require_logged_in, only: [:index, :create, :destroy])
    wrap_parameters include: Subscription.attribute_names

    def create
        @subscription = Subscription.new(subscription_params)
        @subscription.subscriber_id = current_user.id

        if (@subscription.save)
            @server = @subscription.server
            ServersChannel.broadcast_to(@server,
                        type: 'RECEIVE_SERVER',
                        serverId: @server.id,)
            render json: {serverId: @server.id, createdSubscription: true}
        else
            @subscription = Subscription.find_by(subscription_params, subscriber_id: current_user.id)
            if (@subscription)
                @server = @subscription.server
                render json: {serverId: @server.id, createdSubscription: false}
            else
                render json: {errors: @subscription.errors.full_messages}, status: 422
            end

        end
    end

    def destroy
        @subscription = Subscription.find_by(subscriber_id: current_user.id, server_id: params[:id])
        if (@subscription)
            @server = @subscription.server
            @subscription.destroy
            ServersChannel.broadcast_to(@server,
                        type: 'UPDATE_SERVER',
                        serverId: @server.id,)
        end
        render json: nil
    end

    private
    def subscription_params
        params.require(:subscription).permit(:subscriber_id, :server_id)
    end
end
