class UsersController < ApplicationController

  def new
    @user = User.new
    render nothing: true
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:current_user_id] = user.id
      session[:filter] = "showAll"
      redirect_to root_path
    else
      flash[:error] = user.errors.full_messages
      redirect_to root_path
    end
  end

  def show
    @user = current_user
    @notes = @user.notes
  end

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :username)
  end

end
