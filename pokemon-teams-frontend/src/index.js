const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', function(){
  fetchTrainers()
})

function fetchTrainers(){
  fetch(TRAINERS_URL)
    .then(function(resp){
      return resp.json()
    })
    .then(function(trainers){
      console.log(trainers)
      for (const trainer of trainers){
        makeTrainerCard(trainer)
      }
    })
}

function makeTrainerCard(trainer){
  const card = document.createElement('div')
  card.classList += "card"
  card.setAttribute("data-id", trainer.id)
  const trainerName = document.createElement('p')
  trainerName.innerText = trainer.name
  card.appendChild(trainerName)
  const addPokeButton = document.createElement('button')
  addPokeButton.setAttribute("data-trainer-id", trainer.id)
  addPokeButton.innerText = "Add Pokemon"
  card.appendChild(addPokeButton)
  main.appendChild(card)
}