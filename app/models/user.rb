# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  email           :string           not null
#  profile_picture :string
#  status          :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password

    validates(:username, :password_digest, :session_token, :email, presence: true)
    validates(:username, :session_token, :email, uniqueness: true)
    validates(:email, format: { with: URI::MailTo::EMAIL_REGEXP },
                      length: {in: 3..255})
    validates(:username, format: { without: URI::MailTo::EMAIL_REGEXP ,
                                   message: "can't be an email"},
                         length: {in: 2..32})
    validates(:password, length: {in: 8..255}, allow_nil: true)

    before_validation :ensure_session_token

    private

    def generate_unique_session_token
        while (true)
            token = SecureRandom::urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end
