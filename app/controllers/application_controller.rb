class ApplicationController < ActionController::Base
  helper_method :current_user
  protect_from_forgery with: :exception
  def current_user
    @current_user ||= User.find(session[:current_user_id]) if session[:current_user_id]
  end
end
