const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
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
   const card = document.createElement('div')
    card.classList += "card"
    card.dataset["id"] = trainer.id

    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    card.appendChild(trainerName)

    const pokeButton = document.createElement('button')
    pokeButton.setAttribute("data-trainer-id", trainer.id)
    pokeButton.innerText = "Add Pokemon"
    card.appendChild(pokeButton)
    pokeButton.addEventListener('click', addPokemon)

    const pokeList = document.createElement('ul')
    pokeList.id = `trainer-${trainer.id}-pokemon`

    card.appendChild(pokeList)
    main.appendChild(card)

    for (const pokemon of trainer.pokemons){
        renderPokemon(pokemon)
    }

   
    }

    function renderPokemon(pokemon){
        const pokeList = document.getElementById(`trainer-${pokemon.trainer_id}-pokemon`)

        const pokeLi = document.createElement("li")
        pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})` 
        pokeLi.id = `poke-${pokemon.id}`

        const releaseButton = document.createElement("button")
        releaseButton.classList += "release"
        releaseButton.setAttribute("data-pokemon-id", pokemon.id)
        releaseButton.innerText = "Release"
        releaseButton.addEventListener('click', releasePokemon)

        pokeLi.appendChild(releaseButton)

        pokeList.appendChild(pokeLi)
    }

    function addPokemon(event){
        const trainerId = event.target.dataset.trainerId

        const pokeData = {
            trainerId: trainerId
        }

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(pokeData)
        }

        fetch(POKEMONS_URL, configObj)
            .then(function(resp){
                // if (!resp.ok){
                //     throw Error(resp.statusText)
                // }
                return resp.json()
            })
            .then(function(pokemon){
                renderPokemon(pokemon)
            })
    }

    function releasePokemon(event){
        const pokeId = event.target.dataset.pokemonId
        const configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        fetch(`${POKEMONS_URL}/${pokeId}`, configObj)
        .then(function(resp){
            return resp.json()
        })
        .then(function(pokemon){
            const releasedPoke = document.getElementById(`poke-${pokemon.id}`)
            releasedPoke.remove()
        })
    }
    