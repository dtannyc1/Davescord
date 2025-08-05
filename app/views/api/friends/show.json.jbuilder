json.friends do
    json.set! @friend.id do
        if @friend.friender_id == current_user.id
            json.userId @friend.friendee.id
        else
            json.userId @friend.friender.id
        end
        json.friendStatus @friend.status
    end
end

json.users do
    if @friend.friender_id == current_user.id
        json.set! @friend.friendee.id do
            json.extract! @friend.friendee, :id, :username, :profile_picture, :status, :color, :email
            json.photoUrl @friend.friendee.photo.attached? ? @friend.friendee.photo.url : nil
        end
    else
        json.set! @friend.friender.id do
            json.extract! @friend.friender, :id, :username, :profile_picture, :status, :color, :email
            json.photoUrl @friend.friender.photo.attached? ? @friend.friender.photo.url : nil
        end
    end
end
