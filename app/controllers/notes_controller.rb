class NotessController < ApplicationController

  def new

  end

  def create

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