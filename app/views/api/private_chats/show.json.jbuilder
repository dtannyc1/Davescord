json.private_chats do
    json.set! @private_chat.id do
        json.extract @private_chat, :id, :user_1_id, :user_2_id
    end
end
