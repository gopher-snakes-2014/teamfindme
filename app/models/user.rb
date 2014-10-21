VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
class User < ActiveRecord::Base
  has_many :notes
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX },
  uniqueness:  { case_sensitive: false }
  validates :password, presence: true
  validates :username, presence: true, uniqueness: true
  has_secure_password

  if Rails.env.production?

    validates_presence_of :password, :on => :create
    validates_confirmation_of :password
    validates_presence_of :password

  end

end
