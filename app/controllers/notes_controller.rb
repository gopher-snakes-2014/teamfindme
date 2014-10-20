class NotesController < ApplicationController

  def index

  end

  def new
    @note = Note.new
    render nothing: true
  end

  def create
    @new_note = Note.create(user_id: session[:current_user_id], :image => params[:note][:image], :comment => params[:note][:comment])
    @url = @new_note.image.url
    @username = @new_note.user.username
    render :json => [@new_note, @url, @username]
  end

  def update
  end

  def edit
    @note = Note.find(params[:id])
    @note.update_attributes(longitude: params[:longitude], latitude: params[:latitude])
    redirect_to root_path
  end

  def show
    @notes = Note.all
    @notes_in_range = @notes.where("longitude <= #{params[:longitudeMax]} AND longitude >= #{params[:longitudeMin]} AND latitude <= #{params[:latitudeMax]} AND latitude >= #{params[:latitudeMin]}")
    render :json => @notes_in_range
  end

  def radius_search
    @url = []
    @username = []
    @notes_in_range = Note.where("longitude <= #{params[:longitudeMax]} AND longitude >= #{params[:longitudeMin]} AND latitude <= #{params[:latitudeMax]} AND latitude >= #{params[:latitudeMin]}")
    @notes_in_range.each do |note|
      @url << note.image.url
      @username << note.user.username
    end

    render :json => [@notes_in_range, @url, @username]
  end

  def destroy
    Note.find(params[:id]).destroy
    redirect_to :back
  end

  def note_params
    params.require(:note).permit(:picture_path, :comment)
  end

  def find_all
   @note = Note.all
 end

end
