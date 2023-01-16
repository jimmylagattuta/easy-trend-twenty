class FallbackController < ActionController::Base
	def index
		render file: 'sleepy-brook-50921/es20client/public/index.html'
	end
end
