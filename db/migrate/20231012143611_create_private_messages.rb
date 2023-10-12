class CreatePrivateMessages < ActiveRecord::Migration[7.0]
    def change
        create_table :private_messages do |t|
            t.bigint :author_id, null: false
            t.bigint :private_chat_id, null: false
            t.text :body
            t.timestamps
        end

        add_index(:private_messages, :author_id)
        add_index(:private_messages, :private_chat_id)
    end
end
