class Api::ServersController < ApplicationController

    def index
        @servers = Server.all
        render :index
    end

    def show
        @server = Server.find(params[:serverId])

        if @server
            render :show
        else
            render json: {errors: "Server not found"}, status: 404
        end
    end

    def create

    end

    def update

    end

    def destroy

    end

    private
    def server_params
        params.require(:server).permit(:server_name, :owner_id, :server_image)
    end
end
