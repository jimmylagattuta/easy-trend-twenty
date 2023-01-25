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
		render json: "Deleted", status: :ok
	end
    def is_logged_in?
	    @current_user = User.find(session[:user_id] && cookies[:user_id]) if cookies[:user_id] && session[:user_id]
	    if @current_user
	    	carts = @current_user.carts
	    	puts "*" * 100
	    	puts "carts"
	    	puts carts.inspect
	    	puts "*" * 100
	    	if carts.length > 0
		    	cart = carts.where(status: "active")
		    	puts "*" * 100
	    		puts "~  cart  ~" * 10
	    		puts cart.inspect
	    		puts "*" * 100
		      	render json: {
		        	logged_in: true,
		        	user: @current_user,
		        	cart: cart
		      	}, status: :ok
		    else
		      	render json: {
		        	logged_in: true,
		        	user: @current_user,
		        	cart: []
		      	}, status: :ok
		    end
	    else
	      render json: {
	        logged_in: false
	      }, status: :ok
	    end
  end
end
