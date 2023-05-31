json.user do
    json.extract! @user, :id, :username, :profile_picture, :status
end
