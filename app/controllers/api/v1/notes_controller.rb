class Api::V1::NotesController < ApplicationController
	skip_before_action :authenticate_user

	def index
		x = Note.all
		count = 0
		x.each do |note|
			if count <= 2
			else
				note.delete
			end
			count += 1
		end
		render json: Note.all
	end
end
