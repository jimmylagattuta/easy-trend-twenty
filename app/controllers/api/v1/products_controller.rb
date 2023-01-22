class Api::V1::ProductsController < ApplicationController
	skip_before_action :authenticate_user, only: [:all_products, :new_products]

	def all_products
		products = Product.all

		render json: products, status: :ok
	end

	def new_products
		params["_json"].each do |item|
			x = Product.create(title: item["title"], quantity: item["quantity"], price: item["price"], category: item["category"], description: item["description"], image: item["image"], rate: item["rating"]["rate"], quantity: item["rating"]["count"])
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
		render json: { message: "new_products" }, status: :ok
	end
end
