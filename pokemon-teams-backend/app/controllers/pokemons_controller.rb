class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, include: [:trainers]
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon, include: [:trainer]
    end

    def create
        binding.pry
    end
end
