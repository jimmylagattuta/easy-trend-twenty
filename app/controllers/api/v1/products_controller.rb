class Api::V1::ProductsController < ApplicationController
	def all_products
		products = Products.all

		render json: products, status: :created
	end
end
