class UsersChannel < ApplicationCable::Channel
    def subscribed
      @user = User.find_by(id: params[:id])
      stream_for @user
    end
  end
