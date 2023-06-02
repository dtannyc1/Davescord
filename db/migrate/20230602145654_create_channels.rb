class CreateChannels < ActiveRecord::Migration[7.0]
    def change
        create_table :channels do |t|
            t.string :channel_name, null: false
            t.bigint :server_id, null: false
            t.string :category_name
            t.string :description

            t.timestamps
        end

        add_index(:channels, :server_id)
        add_index(:channels, :category_name)
    end
end
