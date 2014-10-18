class SessionsController < ApplicationController

  def new
    @user = User.new
    redirect_to root_path
  end

  def create
    p params
    @user_username = params[:session][:username]

    @user = User.find_by(:username=>@user_username)
    @password = params[:session][:password_digest]

    if @user && @user.authenticate(@password)

      puts 'Login Successful'
      session[:current_user_id] = @user.id
      redirect_to root_path
    else
      p 'login unsuccessful'
      flash[:notice] = "Login Failed"
      redirect_to root_path
    end
  end

  def destroy
    session[:current_user_id] = nil
    p 'session destroyed'
    redirect_to root_path
  end


  def find_model
    @model = Sessions.find(params[:id]) if params[:id]
  end

end