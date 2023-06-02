json.extract!(server, :id, :server_name, :owner_id, :server_image)
json.channels do
    json.array! server.channels do |channel|
        channel.id
    end
end
