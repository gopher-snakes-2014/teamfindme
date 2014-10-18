class NotesController < ApplicationController

  def new

  end

 def create
   p params[:longitude]
   p params[:latitude]
   new_note = Note.create(:longitude => params[:longitude], :latitude => params[:latitude])
   p new_note
   redirect_to root_path
 end

  def update

  end

  def edit

  end

  def show

  end

  def destroy

  end

  def note_params
    params.require(:note).permit(:picture_path, :comment)
  end

end
