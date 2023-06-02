# == Schema Information
#
# Table name: subscriptions
#
#  id            :bigint           not null, primary key
#  subscriber_id :bigint           not null
#  server_id     :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Subscription < ApplicationRecord
    validates(:subscriber_id, :server_id, presence: true)
    validates(:subscriber_id, uniqueness: {scope: :server_id})

    belongs_to(:server,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Server)

    belongs_to(:subscriber,
        primary_key: :id,
        foreign_key: :subscriber_id,
        class_name: :User)
end
