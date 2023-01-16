	class Api::V1::SessionsController < ApplicationController
	skip_before_action :authenticate_user, only: [:create, :is_logged_in?, :destroy]
	def create
		user = User.find_by_email(params[:email_or_username])
		if user&.authenticate(params[:password])
			session[:user_id] = {value: user.id, expires: 45.minutes}
			cookies[:user_id] = {value: user.id, expires: 45.minutes}
			render json: { logged_in: true, user: user }, status: :ok
		else
	        render json: {
	        	logged_in: false
	        }
		end
	end
	def destroy
		session.delete :user_id
		cookies.delete :user_id
		render json: "Deleted" stated: :ok
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
