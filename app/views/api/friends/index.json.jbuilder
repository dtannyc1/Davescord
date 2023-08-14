json.friends do
    @frienders.each do |friend|
        json.set! friend.id do
            json.extract! friend.friendee, :id, :username, :profile_picture, :status, :color, :email
            json.photoUrl friend.friendee.photo.attached? ? friend.friendee.photo.url : nil
            json.friendStatus friend.status
        end
    end
    @friendees.each do |friend|
        json.set! friend.id do
            json.extract! friend.friender, :id, :username, :profile_picture, :status, :color, :email
            json.photoUrl friend.friender.photo.attached? ? friend.friender.photo.url : nil
            json.friendStatus friend.status
        end
    end
end
