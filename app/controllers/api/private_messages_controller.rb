class Api::PrivateMessagesController < ApplicationController
    before_action(:require_logged_in, only: [:index, :show, :create, :update, :destroy])

    def index
        @private_chat = PrivateChat.find(params[:private_chat_id])

        render :index
    end

    def create
        @private_message = PrivateMessage.new(private_messages_params)
        @private_message.author_id = current_user.id
        @private_message.private_chat_id = params[:private_chat_id]

        if (@private_message.save)
            @private_chat = PrivateChat.find(params[:private_chat_id])

            # broadcast to both users
            UsersChannel.broadcast_to(@private_chat.user_1_id,
                type: 'RECEIVE_PRIVATE_MESSAGE',
                privateChatId: @private_chat.id,
                privateMessage: from_template('api/private_messages/_new_show', private_message: @private_message))
            UsersChannel.broadcast_to(@private_chat.user_2_id,
                type: 'RECEIVE_PRIVATE_MESSAGE',
                privateChatId: @private_chat.id,
                privateMessage: from_template('api/private_messages/_new_show', private_message: @private_message))

            render :show
        else
            render json: {errors: @private_message.errors.full_messages}, status: 422
        end

    end

    def update
        @private_message = PrivateMessage.find(params[:id])

        if (@private_message)
            if (@private_message.author_id == current_user.id)
                if (@private_message.update(private_messages_params))

                    @private_chat = PrivateChat.find(@private_message.private_chat_id)
                    # broadcast to both users
                    UsersChannel.broadcast_to(@private_chat.user_1_id,
                        type: 'RECEIVE_PRIVATE_MESSAGE',
                        privateChatId: @private_chat.id,
                        privateMessage: from_template('api/private_messages/_new_show', private_message: @private_message))

                    UsersChannel.broadcast_to(@private_chat.user_2_id,
                        type: 'RECEIVE_PRIVATE_MESSAGE',
                        privateChatId: @private_chat.id,
                        privateMessage: from_template('api/private_messages/_new_show', private_message: @private_message))


                    render :show
                end
            else
                render json: {errors: "Unauthorized, must be author to edit private message"}, status: :unauthorized
            end
        else
            render json: {errors: "Private message not found"}, status: 404
        end
    end

    def destroy
        @private_message = PrivateMessage.find(params[:id])

        if (@private_message)
            if (@private_message.author_id == current_user.id)
                # Broadcast websocket here
                @private_chat = PrivateChat.find(@private_message.private_chat_id)
                UsersChannel.broadcast_to(@private_chat.user_1_id,
                        type: 'DESTROY_PRIVATE_MESSAGE',
                        privateChatId: @private_chat.id,
                        privateMessageId: @private_message.id)

                UsersChannel.broadcast_to(@private_chat.user_2_id,
                        type: 'DESTROY_PRIVATE_MESSAGE',
                        privateChatId: @private_chat.id,
                        privateMessageId: @private_message.id)

                @private_message.destroy
                render json: nil
            else
                render json: {errors: 'Unauthorized, must be author to delete private message'}, status: :unauthorized
            end
        else
            render json: {errors: "Private message not found"}, status: 404
        end
    end

    private
    def private_messages_params
        params.require(:private_messages).permit(:private_chat_id, :body)
    end
end
