json.private_chats do
    json.set! @private_chat.id do
        json.extract @private_chat, :id, :user_1_id, :user_2_id
    end
end

json.private_messages do
    @private_chat.private_messages.each do |message|
        json.set! message.id do
            json.extract message, :id, :author_id, :private_chat_id, :body, :created_at, :updated_at
        end
    end
end
