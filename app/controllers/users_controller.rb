class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:current_user_id] = @user.id
      redirect_to root_path
    else
      p @user.errors.full_messages
      flash[:error] = @user.errors.full_messages
      redirect_to root_path
    end
  end

  def user_params
    params.require(:user).permit(:email, :password_digest, :first_name, :last_name, :username)
  end

end
