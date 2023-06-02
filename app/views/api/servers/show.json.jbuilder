json.partial! 'api/servers/server_show', server: @server

json.channels do
    json.array! @server.channels do |channel|
        json.extract!(channel, :id, :channel_name, :category_name, :description)
    end
end
