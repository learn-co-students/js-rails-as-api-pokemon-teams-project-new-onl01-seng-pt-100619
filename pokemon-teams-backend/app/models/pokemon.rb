class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :pokemon_count_valid?

  private

  def pokemon_count_valid?
    if self.trainer.pokemons.length >= 6
      #add errors
      self.errors.add(:max_pokemon, "Too many pokemons")

    end
  end

end
