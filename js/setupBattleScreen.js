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
    var sprite = document.createElement("img");
    sprite.setAttribute("src", "../sprites/" + enemy.sprite);
    document.getElementById("enemy-sprite").appendChild(sprite);
}

function refreshEnemyInfo(enemy) {
    document.getElementById("enemy-health").innerHTML = "HP: " + enemy.hpLeft;
    if(enemy.statusCondition){
        document.getElementById("enemy-status").innerHTML = enemy.statusCondition;
    }
}

function fillAllyField(ally){
    refreshAllyInfo(ally);
    document.getElementById("ally-level").innerHTML = "Lvl: " + ally.level.toString();
    var sprite = document.createElement("img");
    sprite.setAttribute("src", "../sprites/" + ally.backSprite);
    document.getElementById("enemy-sprite").appendChild(sprite);
}

function refreshAllyInfo(ally){
    document.getElementById("ally-health").innerHTML = "HP: " + ally.hpLeft;
    if(ally.statusCondition){
        document.getElementById("ally-status").innerHTML = ally.statusCondition;
    }
}

function fillMoves(ally){
    //TODO Make it a forloop and dynamic
    document.getElementById("move1").innerHTML = ally.moveSet.move1.name;
    document.getElementById("move1").setAttribute("onClick", "performTurn('move1')");
    document.getElementById("move2").innerHTML = ally.moveSet.move2.name;
    document.getElementById("move2").setAttribute("onClick", "performTurn('move2')");
    document.getElementById("move3").innerHTML = ally.moveSet.move3.name;
    document.getElementById("move3").setAttribute("onClick", "performTurn('move3')");
    document.getElementById("move4").innerHTML = ally.moveSet.move4.name;
    document.getElementById("move4").setAttribute("onClick", "performTurn('move4')");
}