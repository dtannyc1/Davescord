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
#  color           :string
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

    has_many(:servers,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :Server,
        inverse_of: :owner,
        dependent: :destroy)

    has_many(:subscriptions,
        primary_key: :id,
        foreign_key: :subscriber_id,
        class_name: :Subscription,
        inverse_of: :subscriber,
        dependent: :destroy)

    has_many(:subscribed_servers,
        through: :subscriptions,
        source: :server)

    has_many(:messages,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Message,
        inverse_of: :author,
        dependent: :destroy)

    has_many(:private_chats_1,
        primary_key: :id,
        foreign_key: :user_1_id,
        class_name: :PrivateChat,
        inverse_of: :user_1,
        dependent: :destroy)

    has_many(:private_chats_2,
        primary_key: :id,
        foreign_key: :user_2_id,
        class_name: :PrivateChat,
        inverse_of: :user_2,
        dependent: :destroy)

    has_one_attached :photo

    # FIGVAPEBRR

    def self.find_by_credentials(credential, password)
        email_regex = URI::MailTo::EMAIL_REGEXP
        if (email_regex.match(credential))
            user = User.find_by(email: credential)
        else
            user = User.find_by(username: credential)
        end

        if !user
            return nil
        else
            return user.authenticate(password)
        end
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        return self.session_token
    end

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
