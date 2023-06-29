# == Schema Information
#
# Table name: friends
#
#  id          :bigint           not null, primary key
#  friender_id :bigint           not null
#  friendee_id :bigint           not null
#  status      :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Friend < ApplicationRecord
    validates(:friender_id, :friendee_id, :status, presence: true)
    validates(:friender_id, uniqueness: {scope: :friendee_id})

    belongs_to(:friender,
        primary_key: :id,
        foreign_key: :friender_id,
        class_name: :User)

    belongs_to(:friendee,
        primary_key: :id,
        foreign_key: :friendee_id,
        class_name: :User)
end
