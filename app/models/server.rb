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
end
