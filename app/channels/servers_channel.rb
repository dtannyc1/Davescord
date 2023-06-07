class ServersChannel < ApplicationCable::Channel
    def subscribed
      @server = Server.find_by(id: params[:id])
      stream_for @server
    end
  end
