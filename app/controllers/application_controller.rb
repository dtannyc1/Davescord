class ApplicationController < ActionController::API
    include  ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception
    before_action :snake_case_params, :attach_authenticity_token

    def test
        if params.has_key?(:login)
            login!(User.first)
        elsif params.has_key?(:logout)
            logout!
        end

        if current_user
            render json: { user: current_user.slice('id', 'username', 'session_token') }
        else
            render json: ['No current user']
        end
    end

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token! if (current_user)
        session[:session_token] = nil
        @current_user = nil
    end

    def require_logged_in
        render(json: { message: "Unauthorized" }, status: :unauthorized) unless current_user
    end

    private

    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers['X-CSRF-Token'] = masked_authenticity_token(session)
    end
end
