class Api::V1::UsersController < ApplicationController
	skip_before_action :authenticate_user

	def show
		if current_user
			render json: { logged_in: true, user: current_user }, status: :ok
		else
			render json: "Not authenticated", status: :unauthorized
		end
	end

	def create
		user = User.create(user_params)
		# generate username
		if user.valid?
			session[:user_id] = {value: user.id, expires: 1.minutes}
			cookies[:user_id] = {value: user.id, expires: 1.minutes}
			render json: { logged_in: true, user: user }, status: :created
		else
			puts "*" * 100
			render json: user.errors.full_messages, status: :unprocessable_entity
		end
	end

	private

	def user_params
		params.permit(:username, :email, :first_name, :last_name, :password, :password_confirmation)
	end
end