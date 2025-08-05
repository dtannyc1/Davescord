class Api::PrivateChatsController < ApplicationController
    before_action(:require_logged_in, only: [:index, :show, :create, :update, :destroy])

    def index
        @private_chats_1 = PrivateChat.where(user_1_id: current_user.id).includes(:private_messages, :user_1, :user_2)
        @private_chats_2 = PrivateChat.where(user_2_id: current_user.id).includes(:private_messages, :user_1, :user_2)

        render :index
    end

    def show
        @private_chat = PrivateChat.includes(:user_1, :user_2, :private_messages).find(params[:id])

        if (@private_chat.user_1_id != current_user.id &&
            @private_chat.user_2_id != current_user.id)
            render json: {errors: 'Unauthorized'}, status: :unauthorized
            return
        end

        render :show
    end

    def create
        params[:private_chat][:user_1_id] = current_user.id

        existing_chat = PrivateChat.where(
            "(user_1_id = ? AND user_2_id = ?) OR (user_1_id = ? AND user_2_id = ?)",
            current_user.id, params[:private_chat][:user_2_id],
            params[:private_chat][:user_2_id], current_user.id
        ).first

        if existing_chat
            @private_chat = existing_chat
            render :show
            return
        end

        @private_chat = PrivateChat.new(private_chat_params)

        if @private_chat.save
            UsersChannel.broadcast_to(
                User.find(@private_chat.user_2_id),
                type: 'NEW_PRIVATE_CHAT',
                private_chat: @private_chat
            )

            render :show
        else
            render json: @private_chat.errors.full_messages, status: 422
        end
    end

    def destroy
        @private_chat = PrivateChat.find(params[:id])

        if (@private_chat.user_1_id == current_user.id ||
            @private_chat.user_2_id == current_user.id)

            other_user_id = @private_chat.user_1_id == current_user.id ? @private_chat.user_2_id : @private_chat.user_1_id
            UsersChannel.broadcast_to(
                User.find(other_user_id),
                type: 'PRIVATE_CHAT_DELETED',
                private_chat_id: @private_chat.id
            )

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
