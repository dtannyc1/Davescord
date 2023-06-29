json.partial! 'api/servers/server_show', server: @server

json.channels do
    @server.channels.each do |channel|
        json.set! channel.id do
            json.extract!(channel, :id, :channel_name, :category_name, :description)
            json.messages do
                channel.messages.each do |message|
                    json.set! message.id do
                        json.extract!(message, :id, :author_id, :channel_id, :body, :created_at, :updated_at)
                    end
                end
            end
        end
    end
end

json.subscribers do
    @server.subscribers.each do |subscriber|
        json.set! subscriber.id do
            json.extract!(subscriber, :id, :username, :profile_picture, :status, :color)
            json.photoUrl subscriber.photo.attached? ? subscriber.photo.url : nil
        end
    end
end
