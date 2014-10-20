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

end
