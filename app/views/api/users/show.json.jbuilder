json.user do
    json.extract! @user, :id, :username, :profile_picture, :status, :color
    json.photoUrl @user.photo.attached? ? @user.photo.url : nil
end
