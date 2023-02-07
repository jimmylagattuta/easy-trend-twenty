class CartItem < ApplicationRecord
	belongs_to :cart, optional: true
	belongs_to :product

	validates :product_id, uniqueness: true

end
