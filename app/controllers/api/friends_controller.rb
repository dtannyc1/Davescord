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
        @friend = Friend.new(friends_params)

        if @friend.save
            render :show
        else
            render json: @friend.errors.full_messages, status: 422
        end

    end

    def update
        # update existing friend request
        # either to denied or approved

    end

    def destroy
        # unfriend

    end

    private
    def friends_params
        params.require(:friend).permit(:friendee_id)
        # friender_id is logged in user, status defaults to pending
    end
end
