class Api::ServersController < ApplicationController
    before_action(:require_logged_in, only: [:index, :show, :create, :update, :destroy])

    wrap_parameters include: Server.attribute_names

    def index
        @servers = current_user.subscribed_servers.includes(:channels)
        render :index
    end

    def show
        @server = Server.includes(channels: [:messages]).find(params[:id])

        if @server
            render :show
        else
            render json: {errors: "Server not found"}, status: 404
        end
    end

    def create
        # servers should be created with current user as owner,
        # after that, subscription should be created so currentuser is subscribed
        params[:server][:owner_id] = current_user.id
        @server = Server.new(server_params)
        if @server.save
            Subscription.create!({subscriber_id: current_user.id,
                        server_id: @server.id})
            render :show
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def update
        @server = Server.find(params[:id])
        if @server
            if (@server.owner_id == current_user.id)
                if @server.update(server_params)
                    render :show
                end
            else
                render json: {errors: 'Unauthorized, must be owner to update server'}, status: :unauthorized
            end
        else
            render json: {errors: "Server not found"}, status: 404
        end
    end

    def destroy
        @server = Server.find(params[:id])
        if (@server.owner_id == current_user.id)
            @server.destroy
            render json: nil
        else
            render json: {errors: 'Unauthorized, must be owner to delete server'}, status: :unauthorized
        end
    end

    private
    def server_params
        params.require(:server).permit(:server_name, :owner_id, :server_image)
    end
end
