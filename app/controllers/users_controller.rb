class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    p "USERS OARAMSASDJFLASKD"
    p user_params
    @user = User.new(user_params)
    @user.save!
    session[:current_user_id] = @user.id

    p @user
    redirect_to root_path
  end

  def user_params
    params.require(:user).permit(:email, :password_digest, :first_name, :last_name, :username)
  end

end
