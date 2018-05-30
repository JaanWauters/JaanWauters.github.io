function fillBattleScreen(){
    var allyPokemon = getStoredObject("game").chosenPokemon;
    var enemyPokemon = getStoredObject("game").enemyPokemon;
    fillEnemyField(enemyPokemon);
    fillAllyField(allyPokemon);
    fillMoves(allyPokemon);
}

function fillEnemyField(enemy){
    refreshEnemyInfo(enemy);
    document.getElementById("enemy-level").innerHTML = "Lvl: " + enemy.level.toString();
    document.getElementById("enemy-name").innerHTML = enemy.name;
    var sprite = document.createElement("img");
    sprite.setAttribute("src", "../sprites/" + enemy.sprite.toLowerCase());
    document.getElementById("enemy-sprite").appendChild(sprite);
}

function refreshEnemyInfo(enemy) {
    document.getElementById("enemy-health").innerHTML = "HP: " + enemy.hpLeft;
    if(enemy.statusCondition){
        document.getElementById("enemy-status").innerHTML = enemy.statusCondition;
        document.getElementById("enemy-status").classList.add(enemy.statusCondition);
    }
}

function fillAllyField(ally){
    refreshAllyInfo(ally);
    document.getElementById("ally-level").innerHTML = "Lvl: " + ally.level.toString();
    document.getElementById("ally-name").innerHTML = ally.name;
    var sprite = document.createElement("img");
    sprite.setAttribute("src", "../sprites/" + ally.backSprite.toLowerCase());
    document.getElementById("ally-sprite").appendChild(sprite);
}

function refreshAllyInfo(ally){
    document.getElementById("ally-health").innerHTML = "HP: " + ally.hpLeft;
    if(ally.statusCondition){
        document.getElementById("ally-status").innerHTML = ally.statusCondition;
        document.getElementById("ally-status").classList.add(ally.statusCondition);
    }
}

function fillMoves(ally){
    for(var i = 1; i <= 4; i++){
        document.getElementById("move" + i).innerHTML = ally.moveSet["move" + i].name;
        document.getElementById("move" + i).setAttribute("onClick", "performTurn('move" + i + "')");
    }
}