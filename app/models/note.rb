class Note < ActiveRecord::Base
  belongs_to :user
  has_attached_file :image,
            :default_url => "http://www.hollandlift.com/wp-content/themes/hollandlift/assets/images/no_image.jpg",
            :s3_protocol => "https",
            :s3_host_name => "s3-us-west-2.amazonaws.com",
            :style => { :medium => "300x300>", :thumb => "100x100>" },
            :storage => :s3,
            :bucket  => ENV['AWS_ASSETS_BUCKET'],
            :s3_credentials => {
                    :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                    :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                }
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates :comment, presence: true


  def self.notes_in_range(coords)
    notes = Note.where("longitude <= #{coords[:longitudeMax]} AND longitude >= #{coords[:longitudeMin]} AND latitude <= #{coords[:latitudeMax]} AND latitude >= #{coords[:latitudeMin]}")
  end

  def self.notes_out_of_range(in_range)
    self.all - in_range
  end

  def self.username_url(notes)
    url = []
    username = []
    voters = []
    user_id = []
    notes.each do |note|
      url << note.image.url
      username << note.user.username
      user_id << note.user_id
      voters << note.voters
    end
    url_username = [url, username, voters, user_id]
  end

  def self.add_vote(noteID, userID)
    note = Note.find(noteID)
    note.update_attributes(voters: note.voters<<userID)
  end

end
