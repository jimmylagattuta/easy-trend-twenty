class Api::V1::SessionsController < ApplicationController
	skip_before_action :authenticate_user, only: [:create]

	def create
		user = User.find_by_username(param[:username])
		if user&.authenticate(params[:password])
			session[:user_id] = user.id
			render json: user, status: :ok
		else
			render json: "Invalid Credentials. Try again!", status: :unauthorized
		end
	end

	def destroy
		session.delete :user_id
	end
    def is_logged_in?
	    cookies["CSRF-TOKEN"] = {
	            value: form_authenticity_token,
	            domain: :all 
	        }
	    # @current_user = User.find(session[:session_id]) if session[:session_id]
	    @current_user = User.find(cookies[:user_id]) if cookies[:user_id]
	    if @current_user
	      puts "*" * 100
	      puts "@current_user"
	      puts @current_user.inpsect
	      puts "*" * 100
	      render json: {
	        logged_in: true,
	        user: @current_user,
	      }
	    else
	      render json: {
	        logged_in: false,
	        cookie: cookies["CSRF-TOKEN"]
	      }
	    end
  end
end
