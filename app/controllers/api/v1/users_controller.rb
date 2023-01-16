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
			user.employee = false
			user.consumer = true
			user.admin = false
			user.super_admin = false
			user.save
			if user.save
				session[:user_id] = {value: user.id, expires: 45.minutes}
				cookies[:user_id] = {value: user.id, expires: 45.minutes}
			else
				render json: user.errors.full_messages, status: :unprocessable_entity
			end

			render json: { logged_in: true, user: user }, status: :created
		else
			render json: user.errors.full_messages, status: :unprocessable_entity
		end
	end

	private

	def user_params
		params.permit(:username, :email, :first_name, :last_name, :password, :password_confirmation, :consumer, :admin , :super_admin, :employee)
	end
end