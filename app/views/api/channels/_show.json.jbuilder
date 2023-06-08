message_list = []
channel.messages.each do |message|
    message_list.push(message.id)
end

json.extract!(channel, :id, :channel_name, :server_id, :category_name, :description)
json.messages message_list
