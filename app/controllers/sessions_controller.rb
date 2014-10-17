class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create

    @user_username = params[:session][:username]

    @user = User.find_by(:username=>@user_username)

    p params[:session][:password]

    if @user && @user.password == params[:session][:password]

      puts 'Login Successful'
      session[:current_user_id] = @user.id

    else
      flash[:notice] = "Login Failed"
    end

  end
  def destroy
    session[:current_user_id] = nil
  end


  def find_model
    @model = Sessions.find(params[:id]) if params[:id]
  end

end