class Api::SubscriptionsController < ApplicationController
    before_action(:require_logged_in, only: [:index, :create, :destroy])

    def index

    end

    def create

    end

    def destroy

    end

    private
    def subscription_params
        params.require(:subscription).permit(:subscriber_id, :server_id)
    end
end
