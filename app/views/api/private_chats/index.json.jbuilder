json.private_chats do
    @private_chats_1.each do |chat|
        json.set! chat.id do
            json.extract! chat, :id, :user_1_id, :user_2_id
        end
    end

    @private_chats_2.each do |chat|
        json.set! chat.id do
            json.extract! chat, :id, :user_1_id, :user_2_id
        end
    end
end
