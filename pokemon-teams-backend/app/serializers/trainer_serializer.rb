class TrainerSerializer < ActiveModel::Serializer

    # "id": 1,
    # "name": "Natalie",
    attributes :id, :name
    has_many :pokemon

end 