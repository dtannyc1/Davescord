class Api::PrivatechatsController < ApplicationController
    before_action(:require_logged_in, only: [:index, :show, :create, :update, :destroy])

    def index
        @private_chats_1 = current_user.private_chats_1.includes(:private_messages)
        @private_chats_2 = current_user.private_chats_2.includes(:private_messages)
        render :index
    end

    def create
        params[:private_chat][:user_1_id] = current_user.id
        @private_chat = PrivateChat.new(private_chat_params)

        if @private_chat.save

            # Need to broadcast websocket here

            render :show
        else
            render json: @private_chat.errors.full_messages, status: 422
        end
    end

    def destroy
        @private_chat = PrivateChat.find(params[:id])

        if (@private_chat.user_1_id == current_user.id ||
            @private_chat.user_2_id == current_user.id)

            # Need to broadcast websocket here

            @private_chat.destroy
            render json: nil
        else
            render json: {errors: 'Unauthorized, must be owner to delete private chat'}, status: :unauthorized
        end
    end

    private
    def private_chat_params
        params.require(:private_chat).permit(:user_2_id)
    end
end
