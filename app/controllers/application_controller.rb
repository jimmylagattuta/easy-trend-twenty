# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# (-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)
class ApplicationController < ActionController::API
# (-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# (+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)
# class ApplicationController < ActionController::Base
# (+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)(+)
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# (=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)
# /trying something else first /01/16/23 1:39PM Changed to try to fix white blank page on refresh bug
# (=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)(=)
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	include ActionController::Cookies
	before_action :authenticate_user
	rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
	rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

	private

	# def current_user
	# 	User.find_by_id(session[:user_id])
	# end

	def current_user
		@current_user = User.find_by_id(session[:user_id])
	end

	def record_not_found(errors)
		render json: errors.message, status: :not_found
	end

	def invalid_record(invalid)
		render json: invalid.record.errors, status: :unprocessable_entity
	end

	def authenticate_user
		puts "*" * 100
		puts "authenticate_user debugging"
		puts "current_user"
		puts current_user
		puts "current_user.inspect"
		puts current_user.inspect
		puts "*" * 100
		render json: "Not authorized", status: :unauthorized unless current_user
	end
end
