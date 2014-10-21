class SessionsController < ApplicationController

# CR this is on the users_controller
  def new
    @user = User.new
    redirect_to root_path
  end

  def create
    @user_username = params[:session][:username] #CR not needed - use strong params
    @user = User.find_by(:username=>@user_username)
    @password = params[:session][:password] #CR not needed

    if @user && @user.authenticate(@password)
      # CR also add a set_current_user method to application controller
      session[:current_user_id] = @user.id
      redirect_to root_path
    else
      flash[:notice] = "Login Failed"
      redirect_to root_path
    end
  end

  def destroy
    session[:current_user_id] = nil
    redirect_to root_path
  end


  def find_model
    @model = Sessions.find(params[:id]) if params[:id]
  end


end
