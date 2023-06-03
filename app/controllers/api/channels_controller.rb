class Api::ChannelsController < ApplicationController

    def create
        @channel = Channel.new(channel_params)

        if (@channel.server)
            if (@channel.server.owner_id == current_user.id)
                if (@channel.save)
                    render :show
                else
                    render json: {errors: @channel.errors.full_messages}, status: 422
                end
            else
                render json: {errors: 'Unauthorized, must be owner to create channel'}, status: :unauthorized
            end
        else
            render json: {errors: 'Invalid Input'}, status: 422
        end
    end

    def update
        @channel = Channel.find(params[:id])

        if @channel
            if (@channel.server.owner_id == current_user.id)
                if @channel.update(channel_params)
                    render :show
                end
            else
                render json: {errors: 'Unauthorized, must be owner to update channel'}, status: :unauthorized
            end
        else
            render json: {errors: "Channel not found"}, status: 404
        end
    end

    def destroy
        @channel = Channel.find(params[:id])
        if (@channel.server.owner_id == current_user.id)
            @channel.destroy
            render json: nil
        else
            render json: {errors: 'Unauthorized, must be owner to delete channel'}, status: :unauthorized
        end
    end

    private
    def channel_params
        params.require(:channel).permit(:channel_name, :server_id, :category_name, :description)
    end
end
