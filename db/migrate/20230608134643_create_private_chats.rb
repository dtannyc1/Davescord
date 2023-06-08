class CreatePrivateChats < ActiveRecord::Migration[7.0]
    def change
        create_table :private_chats do |t|
            t.bigint :user_1_id, null: false
            t.bigint :user_2_id, null: false
            t.timestamps
        end

        add_index(:private_chats, [:user_1_id, :user_2_id], unique: true)
        add_index(:private_chats, :user_1_id)
        add_index(:private_chats, :user_2_id)
    end
end
