class TrainerSerializer < ActiveModelSerializer
  attributes :id, :name
  has_many :pokemons
end