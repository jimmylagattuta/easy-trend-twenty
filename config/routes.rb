Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  namespace :api do
    namespace :v1 do
      resources :notes, only: [:index]
      get "/me", to: "users#show"
      get "/super_get", to: "users#super_get"
      post "/signup", to: "users#create"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"
      get "/logged_in", to: "sessions#is_logged_in?"
      get "/all_products", to: "products#all_products"
      post "/new_products", to: "products#new_products"
      get "/get_cart", to: "orders#get_cart"
      post "/add_to_cart", to: "orders#add_to_cart"
      post "/minus_from_cart", to: "orders#minus_from_cart"
    end

  end
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
