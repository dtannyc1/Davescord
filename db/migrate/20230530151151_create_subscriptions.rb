class CreateSubscriptions < ActiveRecord::Migration[7.0]
    def change
        create_table :subscriptions do |t|
            t.bigint :subscriber_id, null: false
            t.bigint :server_id, null: false

            t.timestamps
        end

        add_index(:subscriptions, [:subscriber_id, :server_id], unique: true)
        add_index(:subscriptions, :subscriber_id)
        add_index(:subscriptions, :server_id)
    end
end
