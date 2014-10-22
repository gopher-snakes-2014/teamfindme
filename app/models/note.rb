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
      voters << note.voters
    end
    url_username = [url, username, voters]
  end

  def self.add_voter(noteID, userID)
    note = Note.find(noteID)
    unless note.voters.include?(userID)
      new_voters = note.voters<<userID
      note.update_columns(voters: new_voters)
    end
  end

  def self.remove_voter(noteID, userID)
    note = Note.find(noteID)
    if note.voters.include?(userID)
      note.voters.delete(userID)
      note.update_columns(voters: note.voters)
    end
  end

end
