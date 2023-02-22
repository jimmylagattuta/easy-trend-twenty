class NotifierMailer < ApplicationMailer
	def new_forgot_password(user)
		@user = user
		puts "mailer!!!"
		message = mail(
			to: user.email,
			subject: "Forgot Password",
		)
		message.deliver
	end
end
