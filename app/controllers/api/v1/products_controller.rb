class Api::V1::ProductsController < ApplicationController
	skip_before_action :authenticate_user, only: [:all_products, :new_products]

	def all_products
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

		render json: cart_with_products_add, status: :ok
	end

	def new_products
		require "json"
		file = File.open ("jsonValues.json")
		puts "*" * 100
		puts "file"
		puts file
		puts "file.inspect"
		puts file.inspect
		puts "*" * 100
		File.open(file) do |f|
			f.each do |item|
				puts "*" * 100
				puts "item"
				puts item.inspect
				puts "*" * 100
				x = Product.create(title: item["title"], quantity: item["quantity"], price: item["price"], category: item["category"], description: item["description"], image: item["image"], rate: item["rating"]["rate"])
				if x.save
					puts "*" * 100
					puts "ready"
					puts "*" * 100
				else
					puts "Error " * 10
					puts "error"
					puts x.errors.full_messages
					puts "Error " * 10 
				end
			end
		end
		render json: { message: "new_products" }, status: :ok
	end
end
