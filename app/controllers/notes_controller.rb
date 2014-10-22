class NotesController < ApplicationController

  def index
    @note = Note.new
    @user = User.new
    render "index"
  end

  def new
    @note = Note.new
    render nothing: true
  end

  def create
    user = current_user
    new_note = user.notes.create(note_params)
    url = new_note.image.url
    username = new_note.user.username
    render :json => [new_note, url, username]
  end

  def update
    note = Note.find(params[:id])
    note.update_attributes(longitude: params[:longitude], latitude: params[:latitude])
    render nothing:true
  end

  def edit
  end

  def show
    notes = Note.notes_in_range(params)
    out_of_range = Note.notes_out_of_range(notes)
    info = Note.username_url(notes)
    url = info[0]
    username = info[1]
    voters = info[2]
    userId = info[3]
    render :json => [notes, url, username, out_of_range, voters, userId]
  end


  def destroy
    Note.find(params[:id]).destroy
    redirect_to :back
  end

  def note_params
    params.require(:note).permit(:image, :comment)
  end

  def find_all
    note = Note.all
  end

end
