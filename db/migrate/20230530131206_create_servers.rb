class CreateServers < ActiveRecord::Migration[7.0]
    def change
        create_table :servers do |t|
            t.string :server_name, null: false
            t.bigint :owner_id, null: false
            t.string :server_image
            t.timestamps
        end

        add_index(:servers, :owner_id)
        add_index(:servers, :server_name)
    end
end
