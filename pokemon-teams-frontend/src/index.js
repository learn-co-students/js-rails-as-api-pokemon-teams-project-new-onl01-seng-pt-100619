const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", () => {
    const teamHolder = document.querySelector("main")

    function getTrainers(){
        fetch(TRAINERS_URL).then(function(resp) {
            return resp.json() 
        }).then(function(object) { for(const trainer of object) {
            createTrainerCard(trainer)
        }} )
    }

    function createTrainerCard(trainer){ 
        const cardWrapper = document.createElement("div")
        cardWrapper.classList += "card"
        cardWrapper.setAttribute("data-id", trainer.id)

        const trainerName = document.createElement("p")
        trainerName.innerText = trainer.name

        const addBtn = document.createElement("button")
        addBtn.className = "addition"
        addBtn.innerText = "Add Pokemon"
        addBtn.setAttribute("data-trainer-id", trainer.id)
        addBtn.addEventListener("click", function() {
            addPokemon(trainer)
        })

        const pokeList = document.createElement("ul")
        trainer.pokemons.forEach(pokemon => {
            
            pokeList.appendChild(createPokemonLi(pokemon))
        })

        cardWrapper.appendChild(trainerName)
        cardWrapper.appendChild(addBtn)
        cardWrapper.appendChild(pokeList)
        teamHolder.appendChild(cardWrapper)

}

function createPokemonLi(pokemon){
    const pokeLi = document.createElement("li")
    pokeLi.innerText = pokemon.nickname + ` (${pokemon.species})`
    const releaseBtn = document.createElement("button")
    releaseBtn.className = "release"
    releaseBtn.innerText = "Release"
    releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
    releaseBtn.addEventListener("click", () => {
        removePokemon(pokemon)
    })
    pokeLi.appendChild(releaseBtn)
    return pokeLi
}

function addPokemon(trainer){
    if(trainer.pokemons.length < 6){
        const formData = {
            trainer_id: trainer.id
        }
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        } 
        fetch(POKEMONS_URL, configObj).then(resp => {return resp.json()})
        .then(obj => {
            
            const trainerId = obj.trainer_id
            
            const pokeList = document.querySelector("div.card[data-id=" + CSS.escape(trainerId) + "] ul")            
            pokeList.appendChild(createPokemonLi(obj))
        })
    }
    else{
        console.log("This team is full")
    }
}

function removePokemon(pokemon){
    const formData = {
        id: pokemon.id
    }
    const configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    } 
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, configObj).then(() => {
        const pokeId = pokemon.id
        const pokeLi = document.querySelector("button[data-pokemon-id=" + CSS.escape(pokeId) + "]").parentElement
        const pokeList = pokeLi.parentElement
        pokeList.removeChild(pokeLi)
    })
}

    getTrainers()
})