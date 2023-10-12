class Api::PrivatechatsController < ApplicationController
    before_action(:require_logged_in, only: [:index, :show, :create, :update, :destroy])

    def index
        @private_chats_1 = current_user.private_chats_1.includes(:private_messages)
        @private_chats_2 = current_user.private_chats_2.includes(:private_messages)
        render :index
    end

    def create

    end

    def update

    end

    def destroy

    end

    private
    def private_chat_params
        params.require(:private_chat).permit(:user_1_id, :user_2_id)
    end
end
