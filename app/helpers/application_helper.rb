module ApplicationHelper
  def signed_in?
      session[:current_user_id]
    end

    def current_user
      @user ||= session[:current_user_id] && User.find(session[:current_user_id])
    end

    # def avatar_url(user)
    #   gravatar_id = Digest::MD5.hexdigest(user.email.downcase)
    #   "http://gravatar.com/avatar/#{gravatar_id}.png}"
    # end
end
