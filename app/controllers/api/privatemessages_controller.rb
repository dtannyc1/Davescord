class Api::PrivatemessagesController < ApplicationController
    before_action(:require_logged_in, only: [:index, :show, :create, :update, :destroy])

    def index
        @private_chat = PrivateChat.find(params[:private_chat_id])

        render :index
    end

    def create
        @private_message = PrivateMessage.new(private_messages_params)
        @private_message.author_id = current_user.id

        if (@private_message.save)

            # Broadcast WebSocket here
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
                    # Broadcast WebSocket here

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

    end

    private
    def private_messages_params
        params.require(:private_messages).permit(:private_chat_id, :body)
    end
end
