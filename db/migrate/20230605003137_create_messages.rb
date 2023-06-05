class CreateMessages < ActiveRecord::Migration[7.0]
    def change
        create_table :messages do |t|
            t.bigint :author_id, null: false
            t.bigint :channel_id, null: false
            t.text :body
            t.timestamps
        end

        add_index(:messages, :author_id)
        add_index(:messages, :channel_id)
    end
end
