# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

ApplicationRecord.transaction do

    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Server.destroy_all
    Subscription.destroy_all
    Message.destroy_all
    Friend.destroy_all
    PrivateChat.destroy_all
    PrivateMessage.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('subscriptions')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('messages')
    ApplicationRecord.connection.reset_pk_sequence!('friends')
    ApplicationRecord.connection.reset_pk_sequence!('private_chats')
    ApplicationRecord.connection.reset_pk_sequence!('private_messages')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
        username: 'demo-login',
        email: 'demo@user.io',
        color: Faker::Color.hex_color,
        password: 'password'
    )

    User.create!(
        username: 'David',
        email: 'david@user.io',
        color: Faker::Color.hex_color,
        password: 'password'
    )

    # More users
    18.times do |ii|
        User.create!({
            username: Faker::Internet.unique.username(specifier: 3),
            email: Faker::Internet.unique.email,
            color: Faker::Color.hex_color,
            password: 'password'
        })
    end

    Server.create!({
        server_name: Faker::Fantasy::Tolkien.location,
        owner_id: 1#,
        # server_image: "https://loremflickr.com/50/50/icon?random=0"
    })

    Subscription.create!({
        subscriber_id: 1,
        server_id: Server.last.id
    })

    puts "Creating servers..."
    25.times do |ii|
        owner_id = rand(1...10);

        Server.create!({
            server_name: Faker::Fantasy::Tolkien.location,
            owner_id: owner_id#,
            # server_image: "https://loremflickr.com/50/50/icon?random=" + ii.to_s
        })

        Subscription.create!({
            subscriber_id: owner_id,
            server_id: Server.last.id
        })
    end

    puts "Creating subscriptions and friends..."
    [1,2,4,5,8,11,12,16,17,18,19].each do |server_num|
        if (Server.find(server_num).owner_id != 1)
            Subscription.create!({
                subscriber_id: 1,
                server_id: server_num
            })
        end
    end

    # Create specific friend relationship between demo-login (id: 1) and David (id: 2)
    Friend.create!({
        friender_id: 1,  # demo-login
        friendee_id: 2,  # David
        status: "accepted"
    })

    # Add some additional friends for demo-login and David
    [3, 4, 5, 6].each do |user_id|
        # demo-login friends
        Friend.create!({
            friender_id: 1,
            friendee_id: user_id,
            status: "accepted"
        })

        # David friends
        Friend.create!({
            friender_id: 2,
            friendee_id: user_id,
            status: "accepted"
        })
    end

    # Add a pending friend request for demo-login
    Friend.create!({
        friender_id: 7,
        friendee_id: 1,
        status: "pending"
    })

    friends = Hash.new {|h, k| h[k] = Array.new}
    private_chats = Hash.new {|h, k| h[k] = Array.new}

    User.all.each do |user|
        if (user.id != 1)
            subscriptions = []
            10.times do
                subscriptions.push(rand(1...26))
            end
            subscriptions = subscriptions.uniq
            subscriptions.each do |server_num|
                if (Server.find(server_num).owner_id != user.id)
                    Subscription.create!({
                        subscriber_id: user.id,
                        server_id: server_num
                    })
                end
            end
        end

        # create private chats
        num_priv_chats = rand(3..5)
        until (private_chats[user.id].length >= num_priv_chats)
            friend_id = rand(1..20)
            if (friend_id != user.id && !private_chats[user.id].include?(friend_id))
                PrivateChat.create!({
                    user_1_id: user.id,
                    user_2_id: friend_id
                })
                private_chats[user.id].push(friend_id)
                private_chats[friend_id].push(user.id)
            end
        end
    end

    puts "Creating channels..."
    (1..25).to_a.each do |server_num|
        rand(1..5).times do
            Channel.create!({
                channel_name: Faker::Movie.title,
                server_id: server_num,
                category_name: "general",
                description: Faker::TvShows::Stargate.quote
            })
        end
    end

    puts "Creating messages..."
    rand(1..3).times do
        Subscription.all.each do |subscription|
            subscriber = User.find(subscription.subscriber_id)
            channels = Server.find(subscription.server_id).channels
            if (channels.length > 0)
                rand(1..5).times do
                    channel = channels.sample
                    Message.create!({
                        author_id: subscriber.id,
                        channel_id: channel.id,
                        body: Faker::Movies::StarWars.quote
                    })
                end
            end
        end
    end

    puts "Creating private messages..."
    rand(1..3).times do
        PrivateChat.all.each do |private_chat|
            rand(0..5).times do
                PrivateMessage.create!({
                    author_id: private_chat.user_1_id,
                    private_chat_id: private_chat.id,
                    body: Faker::TvShows::DrWho.quote
                })
            end
            rand(0..5).times do
                PrivateMessage.create!({
                    author_id: private_chat.user_2_id,
                    private_chat_id: private_chat.id,
                    body: Faker::TvShows::DrWho.quote
                })
            end
        end
    end
end

puts "Attaching photos to users"
User.all.each_with_index do |user, ii|
    user.photo.attach(io: URI.open("https://davescord-seeds.s3.amazonaws.com/assets/user_icons/#{(ii + 1).to_s.rjust(2, "0")}.jpg"),
                        filename: 'user_icons_' + (ii + 1).to_s.rjust(2, "0") + '.jpg')
end

puts "Attaching photos to servers"
Server.all.each_with_index do |server, ii|
    server.photo.attach(io: URI.open("https://davescord-seeds.s3.amazonaws.com/assets/server_icons/#{(ii + 1).to_s.rjust(2, "0")}.jpg"),
                        filename: 'server_icons_' + (ii + 1).to_s.rjust(2, "0") + '.jpg')
end

puts "Done!"
