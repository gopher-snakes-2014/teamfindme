class NotesController < ApplicationController

  def index
    @note = Note.new
    @user = User.new

    if params[:filter]
      session[:filter] = params[:filter]
    elsif session[:filter] == "user"
      session[:filter] = "mostRecent"
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
    render :json => current_user
  end

  def edit
  end

  def show

    if session[:filter] == "mostLiked"
      searchType = "liked"
    elsif session[:filter] == "showAll"
      searchType = "all"
    elsif session[:filter] == "user"
      searchType = "user"
    else
      searchType = "recent"
    end

    p searchType
    userId = session[:current_user_id]
    notes = Note.notes_in_range(params, searchType, userId)

    out_of_range = Note.notes_out_of_range(notes, searchType, params)
    info = Note.username_url(notes)
    url = info[0]
    username = info[1]
    voters = info[2]
    user_notes = Note.user_notes(userId)

    render :json => [notes, url, username, out_of_range, voters, userId]
  end


  def destroy
    Note.find(params[:id]).destroy
    redirect_to :back
  end

  def note_params
    params.require(:note).permit(:image, :comment, :voters)
  end

  def add_vote
    noteId = params[:noteId]
    userId = params[:userId]
    Note.add_voter(noteId, userId)
    render nothing: true
  end

  def remove_vote
    noteId = params[:noteId]
    userId = params[:userId]
    Note.remove_voter(noteId, userId)
    render nothing:true
  end

end
