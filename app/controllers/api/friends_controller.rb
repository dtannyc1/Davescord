class Api::FriendsController < ApplicationController
    def index
        # get list of all friends for current user
        # all friender and friendee options
        @frienders = Friend.where(friender_id: current_user.id).includes(:friendee)
        @friendees = Friend.where(friendee_id: current_user.id).includes(:friender)

        render :index
    end

    def create
        # create new friend request
        # default to pending
        params[:friend][:friender_id] = current_user.id
        params[:friend][:status] = 'pending'
        @friend = Friend.new(friends_params)

        if @friend.save
            @friendee = User.where(id: params[:friend][:friendee_id])
            render :show
        else
            render json: @friend.errors.full_messages, status: 422
        end
    end

    def update
        @friend = Friend.find(params[:id])
        
        if @friend.friendee_id != current_user.id
            render json: {errors: 'Unauthorized, only friendee can update status'}, status: :unauthorized
            return
        end

        status = params[:friend][:status]
        unless ['pending', 'accepted', 'denied'].include?(status)
            render json: {errors: 'Invalid status'}, status: 422
            return
        end

        if @friend.update(status: status)
            render :show
        else
            render json: @friend.errors.full_messages, status: 422
        end
    end

    def destroy
        @friend = Friend.find(params[:id])
        
        if @friend.friender_id != current_user.id && @friend.friendee_id != current_user.id
            render json: {errors: 'Unauthorized, must be part of friendship to delete'}, status: :unauthorized
            return
        end

        @friend.destroy
        render json: nil
    end

    private
    def friends_params
        params.require(:friend).permit(:friendee_id)
        # friender_id is logged in user, status defaults to pending
    end
end
