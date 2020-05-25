const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

//When a user loads the page, DOM LOADED
document.addEventListener('DOMContentLoaded', function () {
    fetchTrainers()
})

function fetchTrainers() {

    fetch(TRAINERS_URL)
        .then(function (response) {
            return response.json()
        })
        .then(function (trainers) {
            for (const trainer of trainers) {
                makeTrainerCard(trainer)

            }
        })
}

function makeTrainerCard(trainer) {
    //make card
    const card = document.createElement('div')
    card.classList += "card"
    card.setAttribute("data-id", trainer.id)


    // make name p tag
    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    card.appendChild(trainerName)

    //make Add poke button
    const addPokeButton = document.createElement('button')
    addPokeButton.setAttribute("data-trainer-id", trainer.id)
    addPokeButton.innerText = "Add Pokemon"
    card.appendChild(addPokeButton)

    //add event listener to button
    addPokeButton.addEventListener('click', addPokemon)

    //make pokemon list
    const pokemonList = document.createElement('ul')
    pokemonList.id = `trainer-${trainer.id}-pokemon`

    card.appendChild(pokemonList)
    main.appendChild(card)

    for (const pokemon of trainer.pokemons) {
        renderPokemon(pokemon)
    }



}

function renderPokemon(pokemon) {
    const pokeList = document.getElementById(`trainer-${pokemon.trainer_id-pokemon}`)

    const pokeLi = document.createElement("li")
    pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    pokeLi.id = `poke-${pokemon.id}`

    const releaseButton = document.createElement("button")
    releaseButton.classList += "release"
    releaseButton.setAttribute("data-pokemon-id", pokemon.id)
    releaseButton.innerText = "Release"

    //TO DO add event listener
    releaseButton.addEventListener('click', releasePokemon)

    pokeLi.appendChild(releaseButton)

    // pokemonList = const appendChild(pokeLi)
    const pokemonList = document.getElementById(`trainer-${pokemon.trainer_id}-pokemon`)
    pokemonList.appendChild(pokeLi)

}

function addPokemon(event) {
    const trainerId = event.target.dataset.trainerId
    console.log(trainerId)

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
    };

    fetch(POKEMONS_URL, configObj)
        .then(function (resp) {
            if (!resp.ok) {
                throw Error(resp.statusText)
            }
            return resp.json()
        })
        .then(function (pokemon) {
            renderPokemon(pokemon)
        })

}

function releasePokemon(event) {
    const pokeId = event.target.dataset.pokemonId

    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    };
    fetch(`${POKEMONS_URL}/${pokeId}`, configObj)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (pokemon) {
            const releasedPoke = document.getElementById(`poke-${pokemon.id}`)
            releasedPoke.remove()
        })

}
//Whenever a user hits "Release Pokemon" on a specific Pokemon,
// - add event listener for release button

//- send a delete request

//that specific Pokemon should be released from the team.
//- build a destroy action in the controller

//-remove from dom (Frontend)