class Api::ServersController < ApplicationController


    private
    def server_params
        params.require(:server).permit(:server_name, :owner_id, :server_image)
    end
end
