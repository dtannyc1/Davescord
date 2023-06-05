# == Schema Information
#
# Table name: servers
#
#  id           :bigint           not null, primary key
#  server_name  :string           not null
#  owner_id     :bigint           not null
#  server_image :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Server < ApplicationRecord
    validates(:server_name, :owner_id, presence: true)

    belongs_to(:owner,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :User)

    has_many(:subscriptions,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Subscription,
        dependent: :destroy)

    has_many(:subscribers,
        through: :subscriptions,
        source: :subscriber)

    has_many(:channels,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Channel,
        dependent: :destroy)

    has_one_attached :photo
end
