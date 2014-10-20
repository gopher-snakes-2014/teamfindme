class Note < ActiveRecord::Base
  belongs_to :user
  has_attached_file :image,
                    :storage => :s3,
                    :s3_credentials => Proc.new{|a| a.instance.s3_credentials }

  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates :comment, presence: true

  def s3_credentials
    {:bucket => "findmeimages", :access_key_id => "AKIAJ6OO5KTQ2CYI4HYA", :secret_access_key => "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"}
  end

end
