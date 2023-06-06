class Api::MessagesController < ApplicationController

    def index # '/api/channels/1/messages'
        @messages = Message.where(channel_id: params[:channel_id])

        render :index
    end

    def create # '/api/channels/1/messages', 'POST'
        @message = Message.new(message_params)
        @message.channel_id = params[:channel_id]
        @message.author_id = current_user.id

        if (@message.save)
            ChannelsChannel.broadcast_to(@message.channel, type: 'RECEIVE_MESSAGE', channelId: @message.channel.id, message: from_template('api/messages/_new_show', message: @message))
            render :show
        else
            render json: {errors: @message.errors.full_messages}, status: 422
        end
    end

    def update # '/api/messages/1', 'PUT'
        @message = Message.find(params[:id])

        if (@message)
            if (@message.author_id == current_user.id)
                if @message.update(message_params)
                    ChannelsChannel.broadcast_to(@message.channel, type: 'RECEIVE_MESSAGE', channelId: @message.channel.id, message: from_template('api/messages/_new_show', message: @message))
                    render :show
                end
            else
                render json: {errors: 'Unauthorized, must be author to edit message'}, status: :unauthorized
            end
        else
            render json: {errors: "Message not found"}, status: 404
        end
    end

    def destroy # '/api/messages/1', 'DELETE'
        @message = Message.find_by!(id: params[:id])
        if (@message)
            server_owner = @message.channel.server.owner
            if (@message.author_id == current_user.id || server_owner.id == current_user.id)
                ChannelsChannel.broadcast_to(@message.channel, type: 'DESTROY_MESSAGE', messageId: @message.id, channelId: @message.channel.id)
                @message.destroy
                render json: nil
            else
                render json: {errors: 'Unauthorized, must be author or server owner to delete message'}, status: :unauthorized
            end
        else
            render json: {errors: "Message not found"}, status: 404
        end
    end

    private
    def message_params
        params.require(:message).permit(:author_id, :channel_id, :body)
    end
end
