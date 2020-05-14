const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener('DOMContentLoaded', function(){
    fetchTrainers()
})

function fetchTrainers(){
    fetch(TRAINERS_URL)
        .then(function(resp){
            return resp.json() 
        })
        .then(function(trainers){
            for (const trainer of trainers){
                makeTrainerCard(trainer)
            }
        })
}

function makeTrainerCard(trainer){
    //MAKE CARD
    const card = document.createElement('div')
    card.classList += "card" 
    card.dataset["id"] = trainer.id 
    
    //MAKE NAME PTAG
    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    card.appendChild(trainerName)
  
    //MAKE ADD BUTTON
    const addPokeButton = document.createElement("button")
    addPokeButton.dataset.trainerId = trainer.id 
    addPokeButton.innerText = "Add Pokemon"
    card.appendChild(addPokeButton) 
    addPokeButton.addEventListener('click', addPokemon)
      
    //MAKE LIST
    const pokemonList = document.createElement('ul')
    pokemonList.id  = `trainer-${trainer.id}-pokemon`

    card.appendChild(pokemonList)
    main.appendChild(card)

    for (const pokemon of trainer.pokemons) {
        renderPokemon(pokemon)
    } 
}

function renderPokemon(pokemon){
    const list = document.getElementById(`trainer-${pokemon.trainer_id}-pokemon`)

    const pokemonLi = document.createElement("li")
    pokemonLi.id = `pokemon-${pokemon.id}`
    pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    const releaseButton = document.createElement("button")
    releaseButton.classList += "release"
    releaseButton.innerText = "Release"
    releaseButton.dataset.pokemonId = pokemon.id
    releaseButton.addEventListener('click', releasePoke)

    pokemonLi.appendChild(releaseButton)
    list.appendChild(pokemonLi) 
}

function addPokemon(event){

    const trainerId = event.target.dataset.trainerId

    const formData = {
        trainerId: trainerId
    }

    const configObj = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }

    fetch(POKEMONS_URL, configObj)
    .then(function(resp){
        if (!resp.ok){
            throw Error(resp.statusText)
        }
        return resp.json()
    })
    .then(function(pokemon){
        renderPokemon(pokemon)
    })
    .catch(function(error){
        console.log(error)
    })

}

function releasePoke(event){
    const pokemonId = event.target.dataset.pokemonId
    
    const configObj = {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${POKEMONS_URL}/${pokemonId}`, configObj)
    .then(function(resp){
        return resp.json()
    })
    .then(function(obj){
        console.log(obj)
        const pokemon = document.getElementById(`pokemon-${obj.id}`)
        pokemon.remove()
    })
}
