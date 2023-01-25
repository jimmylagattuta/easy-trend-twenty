class Cart < ApplicationRecord
	belongs_to :user
	has_many :cart_items
	has_many :products, through: :shop_items
end
