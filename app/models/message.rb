# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  channel_id :bigint           not null
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
    validates(:author_id, :channel_id, presence: true)

    belongs_to(:author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User)

    belongs_to(:channel,
        primary_key: :id,
        foreign_key: :channel_id,
        class_name: :Channel)
end
