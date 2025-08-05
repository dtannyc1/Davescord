json.friends do
    @frienders.each do |friend|
        json.set! friend.id do
            json.userId friend.friendee.id
            json.friendStatus friend.status
        end
    end
    @friendees.each do |friend|
        json.set! friend.id do
            json.userId friend.friender.id
            json.friendStatus friend.status
        end
    end
end

json.users do
    @frienders.each do |friend|
        json.set! friend.friendee.id do
            json.extract! friend.friendee, :id, :username, :profile_picture, :status, :color, :email
            json.photoUrl friend.friendee.photo.attached? ? friend.friendee.photo.url : nil
        end
    end
    @friendees.each do |friend|
        json.set! friend.friender.id do
            json.extract! friend.friender, :id, :username, :profile_picture, :status, :color, :email
            json.photoUrl friend.friender.photo.attached? ? friend.friender.photo.url : nil
        end
    end
end
