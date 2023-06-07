json.users do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username, :profile_picture, :status, :color
        end
    end
end
