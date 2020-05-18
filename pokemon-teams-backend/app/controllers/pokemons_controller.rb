class PokemonsController < ApplicationController
    
    def index
        pokemon = Pokemon.all
        render json: pokemon
    end

    def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    end

    def destroy
    end
end
