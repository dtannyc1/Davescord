# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Server.destroy_all
    Subscription.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('subscriptions')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'demo-login',
      email: 'demo@user.io',
      password: 'password'
    )

    # More users
    10.times do |ii|
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password',
        profile_picture: "https://loremflickr.com/50/50/dog?random=" + ii.to_s
      })
    end

    puts "Creating servers..."
    25.times do |ii|
        owner_id = rand(1...10);

        Server.create!({
            server_name: Faker::Fantasy::Tolkien.location,
            owner_id: owner_id,
            server_image: "https://loremflickr.com/50/50/icon?random=" + ii.to_s
        })

        Subscription.create!({
            subscriber_id: owner_id,
            server_id: Server.last.id
        })
    end

    puts "Creating subscriptions..."
    [1,2,4,5,8,11,12,16,17,18,19].each do |server_num|
        if (Server.find(server_num).owner_id != 1)
            Subscription.create!({
                subscriber_id: 1,
                server_id: server_num
            })
        end
    end

    puts "Done!"
  end
