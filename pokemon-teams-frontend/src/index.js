const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;


document.addEventListener('DOMContentLoaded', function() {
    displayTrainers();
})


function displayTrainers() {
    fetch(TRAINERS_URL)
    .then(function(resp){
        return resp.json()
    })
    .then(function(trainers){
        for (const trainer of trainers) {
            makeTrainerCard(trainer)
        }
    })
    
}

function makeTrainerCard(trainer) {
    const mainContainer = document.querySelector('main');

    var div = document.createElement('div');
    div.className = "card";
    div.setAttribute('data-id', trainer.id);

    const trainerName = document.createElement('p');
    trainerName.innerText = trainer.name;

    const addButton = document.createElement('button')
    addButton.innerText = "Add Pokemon";
    addButton.setAttribute('data-trainer-id', trainer.id);
    addButton.addEventListener('click', function(){
        addPokemon(trainer)
    });
    const list = document.createElement('ul');

    div.appendChild(trainerName);
    div.appendChild(addButton);
    div.appendChild(list);
   
    trainer.pokemons.forEach(element => {
        const listItem = document.createElement('li');

        const button = document.createElement('button');
        button.className = "release";
        button.setAttribute('data-pokemon-id', element.id)
        button.innerText = "Release";
            button.addEventListener('click', function() {
                deletePokemon(element.id)
                listItem.remove();
            });

        listItem.innerText = `${element.nickname} (${element.species})`;
        listItem.appendChild(button);
        list.appendChild(listItem);
    })
   

    mainContainer.appendChild(div);
}



function deletePokemon(pokemon) {
    let configObj = {
        method: "DELETE",
    }
    fetch(`http://localhost:3000/pokemons/${pokemon}`, configObj);
}

function addPokemon(trainer) {
  
    let formData = {
        trainer_id: trainer.id
    }

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };
    
    if (trainer.pokemons.length < 6) {
       fetch(POKEMONS_URL, configObj)
    }

}