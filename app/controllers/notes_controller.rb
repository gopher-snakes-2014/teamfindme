class NotesController < ApplicationController

  def index
    @note = Note.new
    @user = User.new

    if params[:filter]
      session[:filter] = params[:filter]
    end

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

    if session[:filter] == "mostLiked"
      searchType = "liked"
    elsif session[:filter] == "showAll" || session[:filter].nil?
      searchType = "all"
    else
      searchType = "recent"
    end

    notes = Note.notes_in_range(params, searchType)
    out_of_range = Note.notes_out_of_range(notes, searchType, params)
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

end
