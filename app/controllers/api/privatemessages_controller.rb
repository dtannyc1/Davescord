class Api::PrivatemessagesController < ApplicationController
    before_action(:require_logged_in, only: [:index, :show, :create, :update, :destroy])

    def index
        @private_chat = PrivateChat.find(params[:private_chat_id])

        render :index
    end

    def create

    end

    def update

    end

    def destroy

    end

    private
    def private_messages_params
        params.require(:private_messages).permit(:private_chat_id)
    end
end
