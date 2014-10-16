class SessionsController < ApplicationController

  def new
    # @new_session=Session.new
    @user = User.new
  end

  def create

    @user_email = params[:session][:email]

    @user = User.find_by(:email=>@user_email)

    p params[:session][:password]

    if @user && @user.password == params[:session][:password]

      puts 'you are totes logged in. niiice.'
      session[:current_user_id] = @user.id
      redirect_to questions_path

    else
      flash[:notice] = "you fucking suck. you are dumb and forgot your dumb password. your 2nd grade teacher was right about you."
      redirect_to new_session_path
    end

  end
  def destroy
    session[:current_user_id] = nil
    redirect_to root_path
  end


  private

  def find_model
    @model = Sessions.find(params[:id]) if params[:id]
  end

end