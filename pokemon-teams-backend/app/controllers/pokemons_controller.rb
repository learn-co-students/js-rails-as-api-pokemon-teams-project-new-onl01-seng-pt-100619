class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons
    end
    
    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end 

    def create 
        trainer = Trainer.find(params[:trainer_id])
        pokemon = trainer.pokemons.build
    end

    def destroy 

    end


end
