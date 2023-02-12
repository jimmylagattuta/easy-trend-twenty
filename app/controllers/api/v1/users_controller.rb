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

	def super_get
	    @current_user = User.find(session[:user_id] && cookies[:user_id]) if cookies[:user_id] && session[:user_id]
	    if @current_user
			products = Product.all
		    cart_with_products_add = []
		    products.each do |item|
		    	x = {
		    		productId: item.id,
		    		quantity: item.quantity,
		    		product: item,
		    	}
		    	cart_with_products_add.push(x)
		    end
			consumers = User.where(consumer: true)
			employees = User.where(employee: true)
			admins = User.where(admin: true)
			super_admin_bundle = {
				products: cart_with_products_add,
				consumers: consumers,
				employees: employees,
				admins: admins
			}
			render json: { logged_in: true, super_admin_bundle: super_admin_bundle }, status: :ok
		else
			render json: "Error @current_user", status: :unprocessable_entity
		end
	end

	def super_post
		# puts "*" * 100
		# puts "super post"
		# puts "params"
		# puts params.inspect
		# puts "*" * 100
	    @current_user = User.find(session[:user_id] && cookies[:user_id]) if cookies[:user_id] && session[:user_id]
	    error = nil
	    if @current_user
	    	user = User.find_by(id: params["_json"][0]["ID:"])
	    	# puts "User!!!"
	    	# puts user.inspect
	    	if !user 
	    		user = User.find_by(id: params["_json"][0]["ID:"])
	    	else
	    		user.first_name = params["_json"][0]["First Name:"]
	    		user.last_name = params["_json"][0]["Last Name:"]
	    		user.email = params["_json"][0]["Email:"]
	    		user.consumer = params["_json"][0]["Consumer:"]
	    		user.employee = params["_json"][0]["Employee:"]
	    		user.admin = params["_json"][0]["Admin:"]
	    		user.super_admin = params["_json"][0]["Super Admin:"]
	    		user.save
	    		if user.save
	    			user.save
	    			# puts "saved super_post"
	    		else
	    			# puts "error super_post"
	    			# puts user.errors.full_messages
	    			error = user.errors.full_messages
	    		end
	    	end
			products = Product.all
		    cart_with_products_add = []
		    products.each do |item|
		    	x = {
		    		productId: item.id,
		    		quantity: item.quantity,
		    		product: item,
		    	}
		    	cart_with_products_add.push(x)
		    end
			consumers = User.where(consumer: true)
			employees = User.where(employee: true)
			admins = User.where(admin: true)
			users = nil
			hierarchy = nil
			if user.consumer
				hierarchy = "Consumers"
				users = User.where(consumer: true)
			elsif user.employee
				hierarchy = "Employees"
				users = User.where(employee: true)
			else
				hierarchy = "Admins"
				users = User.where(admin: true)
			end
			super_admin_bundle = {
				products: cart_with_products_add,
				consumers: consumers,
				employees: employees,
				admins: admins,
				user: [user],
				users: [users],
				hierarchy: hierarchy
			}
			if error
				render json: { logged_in: true, super_admin_bundle: super_admin_bundle, error: error }, status: :ok
			else
				render json: { logged_in: true, super_admin_bundle: super_admin_bundle }, status: :ok
			end
		else
			render json: "Error @current_user", status: :unprocessable_entity
		end
	end

	private

	def user_params
		params.permit(:username, :email, :first_name, :last_name, :password, :password_confirmation, :consumer, :admin , :super_admin, :employee)
	end
end