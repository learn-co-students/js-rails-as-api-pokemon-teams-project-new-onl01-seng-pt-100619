const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener('DOMContentLoaded', function(){
    fetchTrainers()
})

function fetchTrainers(){
    fetch(TRAINERS_URL)
    // .then(function(resp){
    //     return resp.json()
    // })
    // .then(function(trainers){
    //     for (const trainer of trainers){
    //         makeTrainerCard(trainer)
    //     }
    // })

    // v2
    .then(resp => resp.json())
    .then(json => {
        json.forEach(trainer => makeTrainerCard(trainer))
    })
}

function makeTrainerCard(trainer){
    // CARD
    const card = document.createElement('div')
    card.classList = "card"
    card.setAttribute("data-id", trainer.id)

    //PTAG
    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name 
    card.appendChild(trainerName)

    //ADD POKE BUTTON
    const addPokeButton = document.createElement('button')
    addPokeButton.setAttribute("data-trainer-id", trainer.id) 
    addPokeButton.innerText = "Add Pokemon"
    card.appendChild(addPokeButton)

    addPokeButton.addEventListener("click", createPokemon)

    // attach event listener to button(click)
    //create new pokemon on backend
    //associate with trainer
    //add new pokemon/render to list (use faker gem to get names)

    //add Pokemon Team
    const pokemonList = document.createElement('ul')
    // for (const pokemon of trainer.pokemons){
    //     renderPokemon()
    // }

    
    
    card.appendChild(pokemonList)
    main.appendChild(card) 
    trainer.pokemons.forEach(pokemon => {
        renderPokemon(pokemon)
    })
}

function renderPokemon(pokemon){
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")

    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    
    const button = document.createElement("button")
    button.classList = "release"
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerText = "Release"
    li.appendChild(button)
    button.addEventListener("click", deletePokemon)

    ul.appendChild(li)
}

function createPokemon(event){
    event.preventDefault()
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: event.target.dataset.trainerId})
    }
    fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(json => {
        if (json.message){
            alert(json.message)
        } else {
            renderPokemon(json)
        }
    })
}

function deletePokemon(event){
    event.preventDefault()
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, configObj)
    event.target.parentElement.remove()
    
}


