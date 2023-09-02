json.friends do
    json.set! @friend.id do
        json.extract! @friendee, :id, :username, :profile_picture, :status, :color, :email
        json.photoUrl @friendee.photo.attached? ? friend.friendee.photo.url : nil
        json.friendStatus @friend.status
    end
end
