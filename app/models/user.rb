class User < ApplicationRecord
	has_secure_password
	validates :email, uniqueness: true
	validates :email, presence: true
	has_many :notes
	has_many :carts
	has_many :cart_items
end
