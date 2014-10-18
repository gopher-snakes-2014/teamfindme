class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    p user_params
    @user = User.create(user_params)
    p @user
    session[:current_user_id] = @user.id
    redirect_to root_path
  end

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :username)
  end

end