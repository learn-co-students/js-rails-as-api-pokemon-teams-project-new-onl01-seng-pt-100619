const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    const teamHolder = document.querySelector("main")

    function getTrainers(){
        fetch(TRAINERS_URL).then(function(resp) {
            return resp.json() 
        }).then(function(object) { for(const trainer of object) {
            createTrainerCards(trainer)
            
        }} )
    }

    function createTrainerCards(trainer){ 
            const addBtn = document.createElement("button")
            addBtn.className = "addition"
            addBtn.innerText = "Add Pokemon"
            addBtn.setAttribute("data-trainer-id", trainer.id)
            addBtn.addEventListener("click", function() {addPokemon(trainer)})
            const pokeList = document.createElement("ul")

            trainer.pokemons.forEach(pokemon => {
                const pokeLi = document.createElement("li")
                pokeLi.innerHTML = getPokemon(pokemon)
                const releaseBtn = document.createElement("button")
                releaseBtn.className = "release"
                releaseBtn.innerText = "Release"
                releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
                pokeLi.appendChild(releaseBtn)
                pokeList.appendChild(pokeLi)
            })

            const cardWrapper = document.createElement("div")
            cardWrapper.classList += "card"
            cardWrapper.setAttribute("data-id", trainer.id)
            
            const trainerName = document.createElement("p")
            trainerName.innerText = trainer.name
            cardWrapper.appendChild(trainerName)
            cardWrapper.appendChild(addBtn)
            cardWrapper.appendChild(pokeList)
            teamHolder.appendChild(cardWrapper)

    }
    function addPokemon(trainer) {
        console.log("click")
        const formData = {
            trainer_id: trainer.id
        }
        const configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        } 
        fetch(POKEMONS_URL, configObj).then(function(resp){return resp.json()}).then(function(obj){ 
            getPokemon(obj)
        }).catch(function(error){console.log(error.message)})
                
    }

         // const pokeLi = document.createElement("li")
            // pokeLi.innerHTML = getPokemon(obj)
            // const releaseBtn = document.createElement("button")
            // releaseBtn.className = "release"
            // releaseBtn.innerText = "Release"
            // releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
            // pokeLi.appendChild(releaseBtn)
            // pokeList.appendChild(pokeLi)

    function getPokemon(pokemon) {
        let pokeData = pokemon.nickname
        pokeData += ` (${pokemon.species})`
        console.log(pokeData)
        return pokeData

    }

    getTrainers()
    //   debugger
}) 
