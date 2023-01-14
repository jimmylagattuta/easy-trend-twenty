Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "fallback#index"
  namespace :api do
    namespace :v1 do
      resources :notes, only: [:index]
      get "/me", to: "users#show"
      post "/signup", to: "users#create"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"

    end

      get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  end
end
