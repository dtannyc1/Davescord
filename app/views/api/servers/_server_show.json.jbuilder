json.extract!(server, :id, :server_name, :owner_id, :server_image)
json.photoUrl server.photo.attached? ? server.photo.url : nil
