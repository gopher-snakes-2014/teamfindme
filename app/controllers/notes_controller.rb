class NotesController < ApplicationController

  def new
    @note = Note.new
    render nothing: true
  end

 def create
   @new_note = Note.create(:longitude => params[:longitude], :latitude => params[:latitude])
   redirect_to root_path
 end

  def update

  end

  def edit

  end

  def show
    @notes = Note.all
    p @notes
    render :json => @notes
  end

  def destroy

  end

  def note_params
    params.require(:note).permit(:picture_path, :comment)
  end

  def find_all
    content_type :json
    @notes = Note.all
    p @notes
    @notes.to_json
    # format.json { render json: @notes }
  end

end
