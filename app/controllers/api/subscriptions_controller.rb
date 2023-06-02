class Api::SubscriptionsController < ApplicationController
    before_action(:require_logged_in, only: [:index, :create, :destroy])
    wrap_parameters include: Subscription.attribute_names

    def create
        @subscription = Subscription.new(subscription_params)
        @subscription.subscriber_id = current_user.id

        if (@subscription.save)
            @server = @subscription.server
            render 'api/servers/show'
        else
            render json: {errors: @subscription.errors.full_messages}, status: 422
        end
    end

    def destroy
        @subscription = Subscription.find_by(subscriber_id: current_user.id, server_id: params[:server_id])
        debugger
        render json: nil
    end

    private
    def subscription_params
        params.require(:subscription).permit(:subscriber_id, :server_id)
    end
end
