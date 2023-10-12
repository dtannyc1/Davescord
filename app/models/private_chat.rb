# == Schema Information
#
# Table name: private_chats
#
#  id         :bigint           not null, primary key
#  user_1_id  :bigint           not null
#  user_2_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PrivateChat < ApplicationRecord
    validates(:user_1_id, :user_2_id, presence: true)
    validates(:user_1_id, uniqueness: {scope: :user_2_id})

    belongs_to(:user_1,
        primary_key: :id,
        foreign_key: :user_1_id,
        class_name: :User)

    belongs_to(:user_2,
        primary_key: :id,
        foreign_key: :user_2_id,
        class_name: :User)

    has_many(:private_messages,
        primary_key: :id,
        foreign_key: :private_chat_id,
        class_name: :PrivateMessage,
        inverse_of: :private_chat,
        dependent: :destroy)
end
