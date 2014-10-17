class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    session[:current_user_id] = @user.id
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

end