require 'rails_helper'

feature 'Welcome page' do
  scenario "User goes to root page" do
    visit root_path
    expect(page).to have_content 'Find Me'
  end
end

# feature 'Log In' do
#   scenario "User can Log In" do
#     @user = User.create(username: "Blah", password: "123456")
#     visit root_path
#     click_link 'Sign In'
#     within('#loginForm') do
#       fill_in 'inputUser', :with => 'Blah'
#       fill_in 'inputPassword', :with => '123456'
#       click_link 'loginBtn'
#     end
#     expect(page).to have_content 'Sign Out'
#   end
# end