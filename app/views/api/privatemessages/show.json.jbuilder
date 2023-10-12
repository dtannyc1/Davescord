json.private_messages do
    json.set! @private_message.id do
        json.extract @private_message, :id, :author_id, :private_chat_id, :body, :created_at, :updated_at
    end
end
