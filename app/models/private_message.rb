# == Schema Information
#
# Table name: private_messages
#
#  id              :bigint           not null, primary key
#  author_id       :bigint           not null
#  private_chat_id :bigint           not null
#  body            :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class PrivateMessage < ApplicationRecord
    validates(:author_id, :private_chat_id, presence: true)

    belongs_to(:author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User)

    belongs_to(:private_chat,
        primary_key: :id,
        foreign_key: :private_chat_id,
        class_name: :PrivateChat)
end
