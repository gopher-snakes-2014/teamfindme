require 'rails_helper'

describe NotesController do
  describe "GET '/'" do
    it "shows a homepage" do
      get 'index'
      expect(response).to have_http_status(200)
    end
  end

  describe "new_note_path" do
    it "successfully hits the route" do
      get 'new'
      expect(response).to have_http_status(200)
    end
  end
  # describe "notes_path" do
  #   it "redirects to root_path" do
  #     post 'create'
  #     expect(response).to redirect_to root_path
  #   end
  # end
end

describe SessionsController do
  describe "new_session_path" do
    it "redirects to root path" do
      get 'new'
      expect(response).to redirect_to root_path
    end
  end
  describe "sessions_path" do
    it "redirects to root path" do
      post 'create',{session:{username:"bobob"}}, {session:{password:"bob"}}
      expect(response).to redirect_to root_path
    end
  end
  describe "sessions_path" do
    it "redirects to root path" do
      get 'destroy'
      expect(response).to redirect_to root_path
    end
  end
end

describe UsersController do
  describe "new_user_path" do
    it "returns a status of 200" do
      get 'new'
      expect(response).to have_http_status(200)
    end
  end
  describe "users_path" do
    it "redirects to root path" do
      post 'create',{user:{first_name: 'bob', last_name: 'bob'}}
      expect(response).to redirect_to root_path
    end
  end
end

