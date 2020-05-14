const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const trainerCard = document.createElement("div")
trainerCard.setAttribute("class","card")


document.addEventListener("DOMContentLoaded", function(){
    fetchTrainers()
})


function fetchTrainers(){
    console.log('loaded')
    fetch(TRAINERS_URL).then(function(response){
       return response.json()
    }).then(
        function(trainers){
            // console.log(trainers)
            for(const trainer of trainers.data){
                makeTrainerCard(trainer);
            } 
        }
    )    
}

function makeTrainerCard(trainer){
    // make card
    const card = document.createElement('div')
    card.classList += "card"
    card.dataset["id"] = trainer.id
    // make ptag
    const trainer_name = document.createElement('p')
    trainer_name.innerText = trainer.attributes.name 

}

