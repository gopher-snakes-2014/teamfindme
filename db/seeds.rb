# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'faker'

40.times do
  Note.create(comment: Faker::Company.bs, longitude: rand(1...10000), latitude: rand(1...10000), user_id: rand(1..10))
end

10.times do
  User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, username: Faker::Internet.user_name, password: Faker::Internet.password)
end