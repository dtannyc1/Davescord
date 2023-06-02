json.partial! 'api/servers/server_show', server: @server

json.channels do
    @server.channels.each do |channel|
        json.set! channel.id do
            json.extract!(channel, :id, :channel_name, :category_name, :description)
        end
    end
end
