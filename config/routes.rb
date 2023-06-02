Rails.application.routes.draw do
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    # Defines the root path route ("/")
    # root "articles#index"

    post 'api/test', to: 'application#test'

    namespace :api, defaults: { format: :json } do
        resources :users, only: [:index, :show, :create]
        resources :servers, only: [:index, :show, :create, :update, :destroy]
        resources :subscriptions, only: [:create, :destroy]
        resources :channels, only: [:create, :update, :destroy]
        resource :session, only: [:show, :create, :destroy]
    end
end
