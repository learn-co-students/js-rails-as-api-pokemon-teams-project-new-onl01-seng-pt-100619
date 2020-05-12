class PokemonSerializer < ActiveModelSerializer
  attributes :id, :nickname, :species, :trainer_id
  belongs_to :trainers
end