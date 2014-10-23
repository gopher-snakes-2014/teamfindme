# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'faker'

# 20.times do
#   Note.create(comment: Faker::Company.bs, longitude: rand(37.470700...37.465800), latitude: rand(-122.235800...-122.234800), user_id: rand(1..10))
# end

# 10.times do
#   User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, username: Faker::Internet.user_name, password: Faker::Internet.password)
# end


# 100.times do
#   lat = (37.7 + rand()/10)
#   lon = (-122.4 - rand()/10)
#   comment = ["Seed: Hi!", "Seed: Hey Hey!", "Seed: Yo!"].sample
#   Note.create(user_id: 1, comment: comment, latitude: lon, longitude: lat)

# end

10.times do
  User.create(
    email: Faker::Internet.email,
    username: Faker::Internet.user_name,
    password: Faker::Internet.password)
end

Note.create(comment: Faker::Company.bs, longitude: 37.784585, latitude: -122.397214, user_id: rand(1..10))

Note.create(comment: Faker::Company.bs, longitude: 37.784123, latitude: -122.397145, user_id: rand(1..10))

Note.create(comment: Faker::Company.bs, longitude: 37.784678, latitude: -122.397321, user_id: rand(1..10))

Note.create(comment: Faker::Company.bs, longitude: 37.784579, latitude: -122.397926, user_id: rand(1..10))

Note.create(comment: Faker::Company.bs, longitude: 37.784836, latitude: -122.397047, user_id: rand(1..10))

Note.create(comment: Faker::Company.bs, longitude: 37.784854, latitude: -122.397284, user_id: rand(1..10))

Note.create(comment: Faker::Company.bs, longitude: 37.784730, latitude: -122.397721, user_id: rand(1..10))

Note.create(comment: Faker::Company.bs, longitude: 37.784836, latitude: -122.397619, user_id: rand(1..10))

Note.create(comment: Faker::Company.bs, longitude: 37.7841185, latitude: -122.3971853, user_id: rand(1..10))

Note.create(comment: Faker::Company.bs, longitude: 37.784052, latitude: -122.397720, user_id: rand(1..10))