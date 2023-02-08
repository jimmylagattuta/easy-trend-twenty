class Api::V1::OrdersController < ApplicationController
	skip_before_action :authenticate_user, only: [:add_to_cart, :minus_from_cart]

	def get_cart
		# puts "*" * 100
		# puts "get_cart"
		# puts "params"
		# puts params..inspect
		# puts "*" * 100
		render json: "get_cart"
	end

	def add_to_cart
	    @current_user = User.find(session[:user_id] && cookies[:user_id]) if cookies[:user_id] && session[:user_id]
	   	# (product id)
	   	params_product_id = params["cartItem"]["id"]
	    if Cart.find_by(user_id: @current_user.id, status: "active")
	    	# puts "Active Cart"
	    	update_cart = Cart.find_by(user_id: @current_user.id, status: "active")
	    	# puts "update_cart"
	    	# puts update_cart.inspect
	    	# puts "1) update_cart.cart_items"
	    	# puts update_cart.cart_items.inspect
	    	new_cart_item = nil
	    	# this was not found as a cart item already associated to the user
	    	# puts "cart_items"
	    	# puts update_cart.cart_items.all.inspect
	    	puts "*" * 100
	    	puts "params"
	    	puts params.inspect
	    	puts "params['cartItem']['id']id"
	    	puts params["cartItem"]["id"]
	    	cartItemProductId = params["cartItem"]["id"]
	    	puts "*" * 100
	    	# puts "update_cart.cart_items.where(product_id: params['product_id'])"
	    	# puts update_cart.cart_items.where(product_id: params['product_id'])

	    	# puts "update_cart.cart_items.find_by(product_id: params['product_id'])"
	    	# puts update_cart.cart_items.find_by(product_id: params['product_id'])
	    	if update_cart.cart_items.find_by(product_id: cartItemProductId)
	    		puts "*" * 100
	    		puts "cart item found!"
	    		puts "*" * 100
	    		x = CartItem.find_by(product_id: cartItemProductId)
	    		x.quantity = x.quantity + 1
	    		x.save
	    		if x.save
	    			puts "saved"
	    		else
	    			puts "error adding 1 to cart item"
	    			puts x.errors.full_messages
	    			# product has already been taken
	    		end
	    		cart_items_list = update_cart.cart_items.all
			    cart_with_products_add = []
			    puts "*" * 100
			    cart_items_list.each do |item|
			    	x = {
			    		productId: item.product_id,
			    		quantity: item.quantity,
			    		product: item.product,
			    		existingCartItem: x,
			    		update_cart: update_cart
			    	}
			    	cart_with_products_add.push(x)
			    end
			    puts "*" * 100
			    bundle = {
			    	cart: update_cart,
			    	cart_items: cart_with_products_add
			    }
				render json: bundle, status: :ok
    			# see comment above
	    	else
	    		puts "cart item not found"
		    	new_cart_item = CartItem.new(user_id: @current_user.id, cart_id: update_cart.id, product_id: params_product_id, quantity: 1)
		    	if new_cart_item.save
		    		# puts "saved"
		    	else
		    		puts "error new_cart_item 1"
		    		puts new_cart_item.errors.full_messages
		    	end
			    cart_items_list = update_cart.cart_items.all
			    cart_with_products_add = []
			    cart_items_list.each do |item|
			    	x = {
			    		productId: item.product_id,
			    		quantity: item.quantity,
			    		product: item.product,
			    		new_cart_item: new_cart_item,
			    		update_cart: update_cart
			    	}
			    	cart_with_products_add.push(x)
			    end
			    bundle = {
			    	cart: update_cart,
			    	cart_items: cart_with_products_add
			    }
				render json: bundle, status: :ok
	    	end
	    	# puts "new_cart_item"
	    	# puts new_cart_item.inspect
	    	# puts "2) update_cart.cart_items"
	    	# puts update_cart.cart_items.inspect
	    else
	    	# puts "No cart"
	    	new_cart = Cart.create(user_id: @current_user.id, status: "active")
	    	new_cart_item = CartItem.create(user_id: @current_user.id, cart_id: new_cart.id, product_id: params_product_id, quantity: 1)
		    cart_items_list = new_cart.cart_items.all
		    cart_with_products_add = []
		    cart_items_list.each do |item|
		    	x = {
		    		productId: item.product_id,
		    		quantity: item.quantity,
		    		product: item.product,
		    		new_cart_item: new_cart_item,
		    		update_cart: update_cart
		    	}
		    	cart_with_products_add.push(x)
		    end
		    bundle = {
		    	cart: new_cart,
		    	cart_items: cart_with_products_add
		    }
		    puts "new_cart_item 2 error"
		    puts new_cart_item.errors.full_messages
			render json: bundle, status: :ok
	    end
	end
	def minus_from_cart
	    @current_user = User.find(session[:user_id] && cookies[:user_id]) if cookies[:user_id] && session[:user_id]
	   	# (product id)
	   	params_product_id = params["cartItem"]["id"]
	    if Cart.find_by(user_id: @current_user.id, status: "active")
	    	# puts "Active Cart"
	    	update_cart = Cart.find_by(user_id: @current_user.id, status: "active")
	    	# puts "update_cart"
	    	# puts update_cart.inspect
	    	# puts "1) update_cart.cart_items"
	    	# puts update_cart.cart_items.inspect
	    	new_cart_item = nil
	    	# this was not found as a cart item already associated to the user
	    	# puts "cart_items"
	    	# puts update_cart.cart_items.all.inspect
	    	puts "*" * 100
	    	puts "params"
	    	puts params.inspect
	    	puts "params['cartItem']['id']id"
	    	puts params["cartItem"]["id"]
	    	cartItemProductId = params["cartItem"]["id"]
	    	puts "*" * 100
	    	# puts "update_cart.cart_items.where(product_id: params['product_id'])"
	    	# puts update_cart.cart_items.where(product_id: params['product_id'])

	    	# puts "update_cart.cart_items.find_by(product_id: params['product_id'])"
	    	# puts update_cart.cart_items.find_by(product_id: params['product_id'])
	    	if update_cart.cart_items.find_by(product_id: cartItemProductId)
	    		puts "*" * 100
	    		puts "cart item found!"
	    		puts "*" * 100
	    		x = CartItem.find_by(product_id: cartItemProductId)
	    		if x.quantity == 1
	    			x.delete
	    		else
		    		x.quantity = x.quantity - 1
		    		x.save
		    		if x.save
		    			puts "saved"
		    		else
		    			puts "error minus 1 from cart item"
		    			puts x.errors.full_messages
		    			# product has already been taken
		    		end

	    		end
	    		cart_items_list = update_cart.cart_items.all
			    cart_with_products_add = []
			    puts "*" * 100
			    cart_items_list.each do |item|
			    	x = {
			    		productId: item.product_id,
			    		quantity: item.quantity,
			    		product: item.product,
			    		existingCartItem: x,
			    		update_cart: update_cart
			    	}
			    	cart_with_products_add.push(x)
			    end
			    puts "*" * 100
			    bundle = {
			    	cart: update_cart,
			    	cart_items: cart_with_products_add
			    }
				render json: bundle, status: :ok
    			# see comment above
	    	else
	    		puts "cart item not found"
		    	new_cart_item = CartItem.new(user_id: @current_user.id, cart_id: update_cart.id, product_id: params_product_id, quantity: 1)
		    	if new_cart_item.save
		    		# puts "saved"
		    	else
		    		puts "error new_cart_item 1"
		    		puts new_cart_item.errors.full_messages
		    	end
			    cart_items_list = update_cart.cart_items.all
			    cart_with_products_add = []
			    cart_items_list.each do |item|
			    	x = {
			    		productId: item.product_id,
			    		quantity: item.quantity,
			    		product: item.product,
			    		new_cart_item: new_cart_item,
			    		update_cart: update_cart
			    	}
			    	cart_with_products_add.push(x)
			    end
			    bundle = {
			    	cart: update_cart,
			    	cart_items: cart_with_products_add
			    }
				render json: bundle, status: :ok
	    	end
	    	# puts "new_cart_item"
	    	# puts new_cart_item.inspect
	    	# puts "2) update_cart.cart_items"
	    	# puts update_cart.cart_items.inspect
	    else
	    	# puts "No cart"
	    	new_cart = Cart.create(user_id: @current_user.id, status: "active")
	    	new_cart_item = CartItem.create(user_id: @current_user.id, cart_id: new_cart.id, product_id: params_product_id, quantity: 1)
		    cart_items_list = new_cart.cart_items.all
		    cart_with_products_add = []
		    cart_items_list.each do |item|
		    	x = {
		    		productId: item.product_id,
		    		quantity: item.quantity,
		    		product: item.product,
		    		new_cart_item: new_cart_item,
		    		update_cart: update_cart
		    	}
		    	cart_with_products_add.push(x)
		    end
		    bundle = {
		    	cart: new_cart,
		    	cart_items: cart_with_products_add
		    }
		    puts "new_cart_item 2 error"
		    puts new_cart_item.errors.full_messages
			render json: bundle, status: :ok
	    end
	end
end
