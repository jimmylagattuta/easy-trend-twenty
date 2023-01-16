	class Api::V1::SessionsController < ApplicationController
	skip_before_action :authenticate_user, only: [:create, :is_logged_in?, :destroy]
	def create
		puts "$" * 200
		user = User.find_by_email(params[:email_or_username])
		# user = User.find_by_username(param[:username])
		puts "*" * 100
		puts "user"
		puts user.inspect
		puts "params"
		puts params.inspect
		puts "*" * 100
		if user&.authenticate(params[:password])
			puts "user & authenticate"
			session[:user_id] = {value: user.id, expires: 45.minutes}
			puts "session.inspect"
			puts session.inspect
			cookies[:user_id] = {value: user.id, expires: 45.minutes}
			puts "cookies.inspect"
			puts cookies.inspect
			render json: { logged_in: true, user: user }, status: :ok

		else
			puts "!user & authenticate"
			# render json: "Invalid Credentials. Try again!", status: :unauthorized
	        render json: {
	        	logged_in: false
	        }
		end
		puts "$" * 200
	end
	def destroy
		session.delete :user_id
		cookies.delete :user_id
	end
    def is_logged_in?
	    @current_user = User.find(session[:user_id] && cookies[:user_id]) if cookies[:user_id] && session[:user_id]
	    if @current_user
	      render json: {
	        logged_in: true,
	        user: @current_user
	      }
	    else
	      render json: {
	        logged_in: false
	      }
	    end
  end
end
