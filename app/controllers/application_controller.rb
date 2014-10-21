class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # CR add controller methods here and add helpers_do to make them available in the view
  # private

  # def current_user
  #   @current_user ||= User.find(session[:user_id]) if session[:user_id]
  # end

  # helpers_do :current_user
end
