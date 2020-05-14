class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :valid_pokemon_count?

  private

  def valid_pokemon_count?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:pokemon_max, "Too many pokemon")
    end
  end
end
