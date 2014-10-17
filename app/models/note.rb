class Note < ActiveRecord::Base
  belongs_to :user
  belongs_to :location
  validates :comment, presence: true
end