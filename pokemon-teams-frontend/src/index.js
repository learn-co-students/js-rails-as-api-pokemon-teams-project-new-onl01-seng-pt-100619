const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

    function fetchTrainers() {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => {

            //render each trainer
            json.forEach(trainer => renderTrainer(trainer))

        }) 
    }

    function renderTrainer(trainer) {
        
        // <div class="card" data-id="1">
        // create card div
        let div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("data-id", `${trainer.id}`);
        
        // <p>Prince</p>
        // create p and appropriate text
        let p = document.createElement("p")
        p.innerHTML = trainer.name
        
        // <button data-trainer-id="1">Add Pokemon</button>
        // create add pokemon button
        let addPokemonButton = document.createElement("button");
        addPokemonButton.innerHTML = "Add Pokémon"
        addPokemonButton.setAttribute("data-trainer-id", `${trainer.id}`)
        
        // add event listener to add pokemon button
        addPokemonButton.addEventListener("click", (event) => {
            event.preventDefault
            const configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    trainer_id: event.target.dataset.trainerId
                })
            }

            fetch(POKEMONS_URL, configObj)
                .then(resp => resp.json())
                .then(json => {
                    if (json.message) {
                        alert(json.message)
                    } 
                    else {
                        
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        
        // <ul>
        // create ul
        let ul = document.createElement("ul");
        
        // fetch trainer's pokemon
        fetch(`${TRAINERS_URL}/${trainer.id}`)
        .then((resp) => {
            return resp.json();
        })
        .then((trainerData) => {
            //iterate through pokemon
            trainerData.pokemons.forEach(pokemon => {
                
                // <li>Jacey (Kakuna) 
                // create an li with appropriate text
                let li = document.createElement("li");
                li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
                li.setAttribute("data-pokemon-id", `${pokemon.id}`)
                
                // <button class="release" data-pokemon-id="140">Release</button></li>
                // have a release button for each pokemon
                let btn = document.createElement("button");
                btn.innerHTML = "Release"
                btn.classList.add("release")

                btn.addEventListener("click", (event) => {
                    event.preventDefault
                    pokemonNumber = event.target.parentElement.getAttribute("data-pokemon-id")

                    debugger
                    console.log(event)
                })
                
                // add elements
                li.append(btn)
                ul.append(li);

                })
            })

        
        
        // add elements 
        div.append(p)
        div.append(addPokemonButton)
        div.append(ul)
        document.querySelector("main").append(div)
        
    }


    fetchTrainers();

})

