class Api::V1::UsersController < ApplicationController
	skip_before_action :authenticate_user

	def show
		if current_user
			render json: current_user, status: :ok
		else
			render json: "Not authenticated", status: :unauthorized
		end
	end

	def create
		user = User.create(user_params)
		if user.valid?
			session[:user_id] = user.id
			cookies[:user_id] = {value: user.id, expires: 30.minutes}
			puts "*" * 100
			puts "session"
			puts session.inspect
			puts "session[:user_id]"
			puts session[:user_id]
			puts "cookies"
			puts cookies.inspect
			puts "cookies[:user_id]"
			puts cookies[:user_id]
			puts "*" * 100
			render json: user, status: :created
		else
			puts "*" * 100
			puts "user not valid"
			puts "user_params"
			puts user_params,inspect
			puts "errors"
			puts user.errors.full_messages
			puts "*" * 100
			render json: user.errors.full_messages, status: :unprocessable_entity
		end
	end

	private

	def user_params
		params.permit(:username, :email, :password, :password_confirmation)
	end
end