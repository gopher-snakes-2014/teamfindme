class NotesController < ApplicationController

  def new
    @note = Note.new
    render nothing: true
  end

  def create
    p "TEST"
     p params
    @new_note = Note.create(:image => params[:note][:image], :comment => params[:note][:comment])
    render :json => @new_note
  end

  def update
    @note = Note.find(params[:note_id])
    @note.update_attributes(longitude: params[:longitude], latitude: params[:latitude])
    @note.save
    redirect_to root_path
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

  def reroute
    @new_note = { comment: params[:note][:comment],
      image: params[:note][:comment] }
      @new_note.to_json
    end

  end
