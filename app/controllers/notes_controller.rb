class NotesController < ApplicationController

  def index
  end

  def new
    @note = Note.new
    render nothing: true
  end

  def create
    @new_note = Note.create(user_id: session[:current_user_id], :image => params[:note][:image], :comment => params[:note][:comment])
    render :json => @new_note
  end

  def update
  end

  def edit
    @note = Note.find(params[:note_id])
    @note.update_attributes(longitude: params[:longitude], latitude: params[:latitude])
    @note.save
    redirect_to root_path
  end

  def show
    @notes = Note.all
    @notes_in_range = @notes.where("longitude <= #{params[:longitudeMax]} AND longitude >= #{params[:longitudeMin]} AND latitude <= #{params[:latitudeMax]} AND latitude >= #{params[:latitudeMin]}")
    render :json => @notes_in_range
  end

  def radius_search
    @notes = Note.all
    @notes_in_range = @notes.where("longitude <= #{params[:longitudeMax]} AND longitude >= #{params[:longitudeMin]} AND latitude <= #{params[:latitudeMax]} AND latitude >= #{params[:latitudeMin]}")
    render :json => @notes_in_range
  end

  def destroy
  end

  def note_params
    params.require(:note).permit(:picture_path, :comment)
  end

  def find_all
   @note = Note.all
  end

  end
