class Note < ActiveRecord::Base
  belongs_to :user
  has_attached_file :image,
            :default_url => "http://png-3.findicons.com/files/icons/329/simple/128/search.png",
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
    notes.each do |note|
      url << note.image.url
      username << note.user.username
    end
    url_username = [url, username]
  end

end
