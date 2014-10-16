require 'rails_helper'

describe HomeController do
  describe "GET '/'" do
    it "shows a homepage" do
      get 'index'
      expect(response).to have_http_status(200)
    end
  end
end
