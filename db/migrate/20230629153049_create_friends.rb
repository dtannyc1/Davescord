class CreateFriends < ActiveRecord::Migration[7.0]
    def change
        create_table :friends do |t|
            t.bigint :friender_id, null: false
            t.bigint :friendee_id, null: false
            t.string :status, null: false
            t.timestamps
        end

        add_index(:friends, [:friender_id, :friendee_id], unique: true)
        add_index(:friends, :friender_id)
        add_index(:friends, :friendee_id)
    end
end
