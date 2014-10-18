class NotesController < ApplicationController

  def new
    @note = Note.new
  end

  def create
    @note = Note.create(note_params)
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