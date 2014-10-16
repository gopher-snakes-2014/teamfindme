VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
class User < ActiveRecord::Base
  has_many :notes
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX },
  uniqueness:  { case_sensitive: false }
  validates :password, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true, uniqueness: true
  has_secure_password
end