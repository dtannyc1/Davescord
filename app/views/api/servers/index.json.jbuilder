json.servers do
    @servers.each do |server|
        json.set! server.id do
            json.partial! 'api/servers/server_show', server: server
        end
    end
end
