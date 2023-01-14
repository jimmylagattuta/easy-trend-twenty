class FallbackController < ActionController::Base
	def index
		render file: 'es20client/public/index.html'
	end
end
