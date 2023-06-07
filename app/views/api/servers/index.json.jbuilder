

json.servers do
    @servers.each do |server|
        json.set! server.id do
            json.partial! 'api/servers/server_show', server: server

            channelIds = server.channels.map{|channel| channel.id}
            json.channels channelIds
        end
    end
end
