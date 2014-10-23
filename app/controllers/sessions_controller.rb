class SessionsController < ApplicationController

  def new
    @user = User.new
    redirect_to root_path
  end

  def create
    @user_username = params[:session][:username]
    @user = User.find_by(:username=>@user_username)
    @password = params[:session][:password]

    if @user && @user.authenticate(@password)
      session[:current_user_id] = @user.id
      session[:filter] = "mostRecent"
      redirect_to root_path
    else
      flash[:notice] = "Login Failed"
      redirect_to root_path
    end
  end

  def destroy
    session.clear()
    redirect_to root_path
  end


  def find_model
    @model = Sessions.find(params[:id]) if params[:id]
  end

end