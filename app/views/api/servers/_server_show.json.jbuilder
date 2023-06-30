json.extract!(server, :id, :server_name, :owner_id, :server_image)
json.photoUrl server.photo.attached? ? server.photo.url : nil

channelIds = server.channels.map{|channel| channel.id}
subscriberIds = server.subscribers.map{|subscriber| subscriber.id}

json.channels channelIds
json.subscribers subscriberIds
