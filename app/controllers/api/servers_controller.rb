class Api::ServersController < ApplicationController
    before_action(:require_logged_in, only: [:index, :show, :create, :update, :destroy])

    wrap_parameters include: Server.attribute_names + [:photo]

    def index
        @servers = current_user.subscribed_servers.includes(channels: [:messages]).includes(:subscribers)
        render :index
    end

    def show
        @server = Server.includes(channels: [:messages]).includes(:subscribers).find_by(id: params[:id])

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
            # ServersChannel.broadcast_to(@server,
            #             type: 'RECEIVE_SERVER',
            #             serverId: @server.id)
            render :show
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def update
        @server = Server.includes(channels: [:messages]).includes(:subscribers).find(params[:id])
        if @server
            if (@server.owner_id == current_user.id)
                if @server.update(server_params)
                    ServersChannel.broadcast_to(@server,
                        type: 'UPDATE_SERVER',
                        serverId: @server.id)
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
        if @server
            if (@server.owner_id == current_user.id)
                ServersChannel.broadcast_to(@server,
                    type: 'DESTROY_SERVER',
                    serverId: @server.id)
                @server.destroy
                render json: nil
            else
                render json: {errors: 'Unauthorized, must be owner to delete server'}, status: :unauthorized
            end
        end
    end

    private
    def server_params
        params.require(:server).permit(:server_name, :owner_id, :server_image, :photo)
    end
end
