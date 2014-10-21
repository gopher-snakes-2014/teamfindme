class NotesController < ApplicationController

  def index
    @note = Note.new

  end

  def new
    @note = Note.new
    render nothing: true
  end

  def create
    # CR use note_params use your relation to set id's ie: current_user.notes.create(note_params)

    @new_note = Note.create(user_id: session[:current_user_id], :image => params[:note][:image], :comment => params[:note][:comment])
    @url = @new_note.image.url #CR see if this works on view if not name it @image_url
    @username = @new_note.user.username #CR this can be accessed directly from the view as current_user.username

    render :json => [@new_note, @url, @username] #CR if rendering json you don't need the @
  end

  def update
  end

  def edit
# CR this code should go in the update action - the edit action is only for showing the form from which you can edit.
    @note = Note.find(params[:id])
    @note.update_attributes(longitude: params[:longitude], latitude: params[:latitude])
    redirect_to root_path
  end

  def show
    # CR show a single note - this route might not be needed.
    @notes = Note.all
    @notes_in_range = @notes.where("longitude <= #{params[:longitudeMax]} AND longitude >= #{params[:longitudeMin]} AND latitude <= #{params[:latitudeMax]} AND latitude >= #{params[:latitudeMin]}")
    render :json => @notes_in_range
  end

  def radius_search
    # CR this should be your index route.
    # CR move a lot of this logic to the model. notes_in_range and notes method
    @url = []
    @username = []

    @notes_in_range = Note.where("longitude <= #{params[:longitudeMax]} AND longitude >= #{params[:longitudeMin]} AND latitude <= #{params[:latitudeMax]} AND latitude >= #{params[:latitudeMin]}")
    @notes_out_of_range = Note.all - @notes_in_range
    # CR BUGBUG - fix this with includes.
    @notes_in_range.each do |note|
      @url << note.image.url
      @username << note.user.username
    end
    render :json => [@notes_in_range, @url, @username, @notes_out_of_range]
  end

  def destroy
  end

  def note_params
    params.require(:note).permit(:image, :comment)
  end

  def find_all
   @note = Note.all
  end

end
