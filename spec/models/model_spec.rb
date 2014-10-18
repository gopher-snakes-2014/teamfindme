require 'rails_helper'

describe User do
  it "is valid with valid credentials" do
    user = User.new(
      first_name: "Bob",
      last_name: "Bob",
      email: "bob@bob.bob",
      username: "bobob",
      password_digest: "bob"
      )
    expect(user).to be_valid
  end
  it "is not valid without a first_name" do
    user = User.new(
      first_name: "",
      last_name: "Bob",
      email: "bob@bob.bob",
      username: "bobob",
      password_digest: "bob"
      )
    expect(user).to_not be_valid
  end
  it "is not valid without a last_name" do
    user = User.new(
      first_name: "Bob",
      last_name: "",
      email: "bob@bob.bob",
      username: "bobob",
      password_digest: "bob"
      )
    expect(user).to_not be_valid
  end
  it "is not valid without an email" do
   user = User.new(
    first_name: "Bob",
    last_name: "Bob",
    email: "",
    username: "bobob",
    password_digest: "bob"
    )
   expect(user).to_not be_valid
 end
 it "is not valid without a username" do
   user = User.new(
    first_name: "Bob",
    last_name: "Bob",
    email: "bob@bob.bob",
    username: "",
    password_digest: "bob"
    )
   expect(user).to_not be_valid
 end
 it "is not valid without a password_digest" do
   user = User.new(
    first_name: "Bob",
    last_name: "Bob",
    email: "bob@bob.bob",
    username: "bobob",
    password_digest: ""
    )
   expect(user).to_not be_valid
 end
end

describe Note do
  it "is valid with valid credentials" do
    note = Note.new(
      comment: "blah blah",
      picture_path: "asd/asd/asd",
      longitude: "123456",
      latitude: "78910"
      )
    expect(note).to be_valid
  end
  it "is not valid without a comment" do
    note = Note.new(
      comment: "",
      picture_path: "asd/asd/asd",
      longitude: "123456",
      latitude: "78910"
      )
    expect(note).to_not be_valid
  end
  it "is valid without a picture_path" do
    note = Note.new(
      comment: "blah",
      picture_path: "",
      longitude: "123456",
      latitude: "78910"
      )
    expect(note).to be_valid
  end
  it "is not valid without longitude" do
    note = Note.new(
      comment: "blah",
      picture_path: "asd/asd/asd",
      longitude: "",
      latitude: "78910"
      )
    expect(note).to_not be_valid
  end
  it "is not valid without latitude" do
    note = Note.new(
      comment: "blah",
      picture_path: "asd/asd/asd",
      longitude: "123456",
      latitude: ""
      )
    expect(note).to_not be_valid
  end
end



