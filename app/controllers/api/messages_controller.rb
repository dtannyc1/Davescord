class Api::MessagesController < ApplicationController

    def index
        @messages = Message.where(channel_id: params[:channel_id])

        render :index
    end

    def create

    end

    def update

    end

    def destroy

    end

    private
    def message_params
        params.require(:message).permit(:author_id, :channel_id, :body)
    end
end
