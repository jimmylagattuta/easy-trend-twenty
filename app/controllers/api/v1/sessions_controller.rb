	class Api::V1::SessionsController < ApplicationController
	skip_before_action :authenticate_user, only: [:create, :is_logged_in?, :destroy]
	def create
		user = User.find_by_email(params[:email_or_username])
		if user&.authenticate(params[:password])
			session[:user_id] = {value: user.id, expires: 45.minutes}
			cookies[:user_id] = {value: user.id, expires: 45.minutes}
	    	carts = user.carts
	    	if carts.length > 0
		    	cart = carts.find_by(status: "active")
			    cart_items_list = nil
			    if cart.cart_items.length > 0
				    cart_items_list = cart.cart_items.all
				else 
					cart_items_list = []
				end
			    cart_with_products_add = []
			    cart_items_list.each do |item|
			    	x = {
			    		productId: item.product_id,
			    		quantity: item.quantity,
			    		product: item.product,
			    	}
			    	cart_with_products_add.push(x)
			    end


				render json: { logged_in: true, user: user, cart: cart, cart_items: cart_with_products_add }, status: :ok
			else
				render json: { logged_in: true, user: user, cart: [], cart_items: [] }, status: :ok
			end
		else
	        render json: {
	        	logged_in: false
	        }
		end
	end
	def destroy
		session.delete :user_id
		cookies.delete :user_id
		render json: { message: "Deleted"}, status: :ok
	end
    def is_logged_in?
	    @current_user = User.find(session[:user_id] && cookies[:user_id]) if cookies[:user_id] && session[:user_id]
	    if @current_user
	    	carts = @current_user.carts
	    	# puts "*" * 100
	    	# puts "carts"
	    	# puts carts.inspect
	    	# puts "*" * 100
	    	if carts.length > 0
		    	cart = carts.find_by(status: "active")
		    	# puts "*" * 100
	    		# puts "~  cart  ~" * 10
	    		# puts cart.inspect
	    		# puts "*" * 100


			    cart_items_list = cart.cart_items.all
			    cart_with_products_add = []
			    puts "*" * 100
			    cart_items_list.each do |item|
			    	x = {
			    		productId: item.product_id,
			    		quantity: item.quantity,
			    		product: item.product
			    	}
			    	cart_with_products_add.push(x)
			    end

		      	render json: {
		        	logged_in: true,
		        	user: @current_user,
		        	cart: cart,
		        	cart_items: cart_with_products_add
		      	}, status: :ok
		    else
		      	render json: {
		        	logged_in: true,
		        	user: @current_user,
		        	cart: [],
		        	cart_items: [],
		      	}, status: :ok
		    end
	    else
	      render json: {
	        logged_in: false
	      }, status: :ok
	    end
  end
end
