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
            const addConfigObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    trainer_id: event.target.dataset.trainerId
                })
            }

            fetch(POKEMONS_URL, addConfigObj)
                .then(resp => resp.json())
                .then(pkmn => {
                    if (pkmn.message) {
                        alert(pkmn.message)
                    } 
                    else {
                        //find the pokemon for render pokemon
                        renderPokemon(pkmn)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        
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
                renderPokemon(pokemon)
            })
        })
        
        function renderPokemon(pokemon) { 

            // create an li with appropriate text
            let li = document.createElement("li");
            li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
            li.setAttribute("data-pokemon-id", `${pokemon.id}`)
            
            // have a release button for each pokemon
            let releaseButton = document.createElement("button");
            releaseButton.innerHTML = "Release"
            releaseButton.classList.add("release")
            releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`)

            //add event listener to release button
            releaseButton.addEventListener("click", (event) => {
                event.preventDefault
                pokemonNumber = event.target.dataset.pokemonId

                const releaseConfigObj = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
    
                fetch(`${POKEMONS_URL}/${pokemonNumber}`, releaseConfigObj);
                event.target.parentElement.remove();

            })
            
            // add elements
            li.append(releaseButton)
            ul.append(li);
        }
        
        
        // add elements 
        div.append(p)
        div.append(addPokemonButton)
        div.append(ul)
        document.querySelector("main").append(div)
        
    }


    fetchTrainers();

})

