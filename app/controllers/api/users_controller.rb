class Api::UsersController < ApplicationController

    wrap_parameters include: User.attribute_names + ['password']

    def index
        @users = User.all

        render :index
    end

    def show
        @user = User.find(params[:id])

        if (@user)
            render :show
        else
            render json: { errors: ['User not found']}, status: 422
        end
    end

    def create
        @user = User.new(user_params)

        if (@user.save)
            login!(@user)
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: 422 # maybe make these full errors
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password, :email, :profile_picture, :status)
    end
end
