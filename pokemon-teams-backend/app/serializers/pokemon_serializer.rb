class PokemonSerializer < ActiveModel::Serializer

    # id": 1,
    # "species": "Venomoth",
    # "nickname": "Rusty",
    # "trainer_id": 1,
    attributes :id, :species, :nickname, :trainer_id


end 