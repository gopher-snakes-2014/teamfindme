module Paperclip
  class Attachment
    def default_options
      @default_options ||= {
        :default_url       => "/assets/products/default/:style/Testudo1920.jpg",
        :default_style     => :thumb,
        :storage           => :filesystem,
      }
    end
  end
end