json.private_chats do
    json.set! @private_chat.id do
        json.extract! @private_chat, :id, :user_1_id, :user_2_id
        json.messages @private_chat.private_messages.map{|message| message.id}
    end
end

json.users do
    json.set! @private_chat.user_1.id do
        json.extract! @private_chat.user_1, :id, :username, :profile_picture, :status, :color, :email
        json.photoUrl @private_chat.user_1.photo.attached? ? @private_chat.user_1.photo.url : nil
    end
    json.set! @private_chat.user_2.id do
        json.extract! @private_chat.user_2, :id, :username, :profile_picture, :status, :color, :email
        json.photoUrl @private_chat.user_2.photo.attached? ? @private_chat.user_2.photo.url : nil
    end
end
