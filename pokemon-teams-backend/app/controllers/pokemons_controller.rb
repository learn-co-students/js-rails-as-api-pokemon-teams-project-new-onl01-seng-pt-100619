class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons, include: [:trainer]
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon, include: [:trainer]
    end

    def create
        trainer = Trainer.find_by_id(params["trainerID"])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = trainer.pokemon.build(nickname: name, species: species)
        if pokemon.save
            render json: pokemon
        else
            render json: pokemon, status: 500
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: pokemon
    end
end
