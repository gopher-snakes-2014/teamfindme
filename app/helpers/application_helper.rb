module ApplicationHelper
  def signed_in?
    session[:current_user_id]
  end

  def avatar_url
    gravatar_id = Digest::MD5.hexdigest(current_user.email.downcase)
    "http://gravatar.com/avatar/#{gravatar_id}.png}"
  end
end
