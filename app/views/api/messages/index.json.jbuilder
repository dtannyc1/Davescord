json.messages do
    @messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :author_id, :body, :created_at
        end
    end
end
