json.friends do
    @frienders.each do |friend|
        json.set! friend.id do
            json.extract! friend.friendee, :id, :username, :profile_picture, :status, :color, :email
            json.photoUrl friend.friendee.photo.attached? ? user.photo.url : nil
            json.status friend.status
        end
    end
end
