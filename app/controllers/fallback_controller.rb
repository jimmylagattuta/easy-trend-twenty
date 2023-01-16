class FallbackController < ActionController::Base
	def index
		render file: 'easy-trend-twenty/es20client/public/index.html'
	end
end
