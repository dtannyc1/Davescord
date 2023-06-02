json.extract!(server, :id, :server_name, :owner_id, :server_image)
tmparr = []
server.channels.each do |channel|
    tmparr.push(channel.id)
end
json.channels tmparr
