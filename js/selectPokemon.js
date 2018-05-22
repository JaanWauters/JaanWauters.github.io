function displayPokemonSelection(){
    var allSelectablePokemon = getStoredObject("pokemon");
    console.log(allSelectablePokemon);
    for(var pokemon in allSelectablePokemon){
        if (allSelectablePokemon.hasOwnProperty(pokemon)){
            console.log(pokemon);
            var pokemonContainer = clonePokemonContainer();
            pokemonContainer.classList.remove("hidden");
            pokemonContainer.removeAttribute("id");
            pokemonContainer.getElementsByClassName("name")[0].innerHTML = allSelectablePokemon[pokemon].name;
            pokemonContainer.getElementsByClassName("type")[0].innerHTML = allSelectablePokemon[pokemon].type1.name;
            if(allSelectablePokemon[pokemon].type2){
                pokemonContainer.getElementsByClassName("type")[1].innerHTML = allSelectablePokemon[pokemon].type2.name;
            } else {
                pokemonContainer.getElementsByClassName("type")[1].classList.add("hidden");
            }
            var sprite = document.createElement("img");
            sprite.setAttribute("src", "../sprites/" + allSelectablePokemon[pokemon].sprite.toLowerCase());
            console.log(allSelectablePokemon[pokemon].sprite);
            pokemonContainer.getElementsByClassName("sprite")[0].appendChild(sprite);
            var baseStats = allSelectablePokemon[pokemon].baseStats;
            var ulStats = makeListStats(baseStats);
            pokemonContainer.getElementsByClassName("basestats")[0].appendChild(ulStats);
            var moveSet = allSelectablePokemon[pokemon].moveSet;
            var ulMoves = makeListMoves(moveSet);
            pokemonContainer.getElementsByClassName("moveset")[0].appendChild(ulMoves);
            pokemonContainer.getElementsByClassName("select-button")[0].setAttribute("onClick", "choosePokemon('" + pokemon + "')");
            document.getElementById("pokemon-container").appendChild(pokemonContainer);
        }
    }
}

function clonePokemonContainer(){
    var container = document.getElementById("dummy");
    return container.cloneNode(true);
}

function makeListStats(obj) {
    var ul = document.createElement("ul");
    for(var item in obj){
        if(obj.hasOwnProperty(item)){
            var li = document.createElement("li");
            li.innerHTML = item + ": " + obj[item];
            ul.appendChild(li);
        }
    }
    return ul;
}

function makeListMoves(obj) {
    var ul = document.createElement("ul");
    for(var item in obj){
        if(obj.hasOwnProperty(item)){
            var li = document.createElement("li");
            li.innerHTML = obj[item].name;
            ul.appendChild(li);
        }
    }
    return ul;
}