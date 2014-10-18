class Note < ActiveRecord::Base
  belongs_to :user
  # validates :comment, presence: true
  validates :longitude, presence: true
  validates :latitude, presence: true
end
