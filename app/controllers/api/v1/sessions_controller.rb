	class Api::V1::SessionsController < ApplicationController
	skip_before_action :authenticate_user, only: [:create, :is_logged_in?]
	def create
		puts "$" * 200
		user = User.find_by_email(param[:email])
		# user = User.find_by_username(param[:username])
		puts "*" * 100
		puts "user"
		puts user.inspect
		puts "*" * 100
		if user&.authenticate(params[:password])
			puts "user & authenticate"
			session[:user_id] = {value: user.id, expires: 1.minutes}
			puts "session.inspect"
			puts session.inspect
			cookies[:user_id] = {value: user.id, expires: 1.minutes}
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
		puts "*" * 100
		puts "session 1"
		puts session.insepct
		puts "*" * 100
		puts "cookies 1"
		puts cookies.inspect
		puts "*" * 100
		session.delete :user_id
		cookies.delete :user_id
		puts "*" * 100
		puts "session 2"
		puts session.insepct
		puts "*" * 100
		puts "cookies 2"
		puts cookies.inspect
		puts "*" * 100
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
