class Note < ActiveRecord::Base
  belongs_to :user
  has_attached_file :image,
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


  def self.notes_in_range(coords, searchType, userId)
    if searchType == "all"
      notes = Note.where("longitude <= #{coords[:longitudeMax]} AND longitude >= #{coords[:longitudeMin]} AND latitude <= #{coords[:latitudeMax]} AND latitude >= #{coords[:latitudeMin]}")

    elsif searchType == "liked"
      notes = Note.where("longitude <= #{coords[:longitudeMax]} AND longitude >= #{coords[:longitudeMin]} AND latitude <= #{coords[:latitudeMax]} AND latitude >= #{coords[:latitudeMin]}")
      notes = (notes.sort_by { |note| -note.voters.count}).shift(5)

    elsif searchType == "recent"
      timeAgo = 15.minute.ago

      notes = Note.where("longitude <= #{coords[:longitudeMax]} AND longitude >= #{coords[:longitudeMin]} AND latitude <= #{coords[:latitudeMax]} AND latitude >= #{coords[:latitudeMin]} AND created_at >= ?", timeAgo)
    elsif searchType == "user"
      user = User.find(userId)
      notes = user.notes
    end
  end

  def self.notes_out_of_range(in_range, searchType, coords)
      longitudeMax = coords[:longitudeMax].to_f + 0.0005
      longitudeMin = coords[:longitudeMin].to_f - 0.0005
      latitudeMax = coords[:latitudeMax].to_f + 0.0005
      latitudeMin = coords[:latitudeMin].to_f - 0.0005

    if searchType == "all"
      out_range = self.all
      # out_range = Note.where("longitude <= #{ longitudeMax.to_s } AND longitude >= #{ longitudeMin.to_s } AND latitude <= #{ latitudeMax.to_s } AND latitude >= #{ latitudeMin.to_s }")
    elsif searchType == "liked"
      notes = Note.where("longitude <= #{ longitudeMax.to_s } AND longitude >= #{ longitudeMin.to_s } AND latitude <= #{ latitudeMax.to_s } AND latitude >= #{ latitudeMin.to_s }")
      out_range = (notes.sort_by { |note| -note.voters.count}).shift(5)
    elsif searchType == "recent"
      timeAgo = 15.minute.ago
      out_range = Note.where("created_at >= ?", timeAgo)
    elsif searchType == "user"
      out_range = []
    end

    out_range - in_range
  end

  def self.username_url(notes)
    url = []
    username = []
    voters = []
    # user_id = []
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

  def self.user_notes(user)
    user_notes = Note.where("user_id = #{user}")
  end

end
