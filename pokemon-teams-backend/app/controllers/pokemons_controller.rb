class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons, include: [:trainer]
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon  
  end
end
