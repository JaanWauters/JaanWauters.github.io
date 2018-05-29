var environment = new Environment();

const KindOfMove = {
  status : "status",
  special :"special",
  physical : "physical"
};

const StatusConditions = {
    burn : "burn",
    freeze :"freeze",
    paralyze : "paralyze",
    sleep : "sleep",
    poison : "poison"
};

function calculateDamage(attackingPokemon, defendingPokemon, move){
    //TODO implement status conditions + confusion
    var incomingAttack = attackingPokemon.moveSet[move];
    var random = Math.ceil(Math.random() * 100);
    if(incomingAttack.kindOfMove !== KindOfMove.status && random <= incomingAttack.accuracy) {
        var attack = "attack";
        var defend = "defence";
        if (incomingAttack.kindOfMove === KindOfMove.special) {
            attack = "specialAttack";
            defend = "specialDefence";
        }
        console.log("Damage will be calculated based on:", attack, defend);
        var levelCalc = ((2 * attackingPokemon.level) / 5) + 2;
        var modifier = calculateModifier(incomingAttack, attackingPokemon, defendingPokemon);
        var statChangeAtk = attackingPokemon.statChanges[attack].top / attackingPokemon.statChanges[attack].bottom;
        var statChangeDef = defendingPokemon.statChanges[defend].top / defendingPokemon.statChanges[defend].bottom;
        console.log(statChangeAtk, statChangeDef);
        var damage = ((levelCalc * incomingAttack.power * ((attackingPokemon.stats[attack] * statChangeAtk) / (defendingPokemon.stats[defend] * statChangeDef))) / 50 ) + 2;
        damage = damage * modifier;
        damage = Math.ceil(damage);
        return damage;
    }
    return 0;
}

function calculateModifier(incomingAttack, attackingPokemon, defendingPokemon){
    //Targets * Weather * Badge (1) * Critical * random * STAB * Type (super/not effective) * Burn * Other (1)
    // https://bulbapedia.bulbagarden.net/wiki/Damage
    var targetsMod = 1; //Singles only
    var weatherMod = calcWeatherMod(incomingAttack);
    var badgeMod = 1; //Enkel gen 2, default == 1
    var criticalMod = criticalHit();
    var randomMod = Math.random() * (1 - 0.85) + 0.85;
    var stabMod = checkSTAB(incomingAttack, attackingPokemon);
    var typeMod = isSupperEffective(incomingAttack, defendingPokemon);
    var burnMod = checkBurn(incomingAttack, attackingPokemon);
    var other = 1; //Not gonna bother with this

    return targetsMod * weatherMod * badgeMod * criticalMod * randomMod * stabMod * typeMod * burnMod * other;
}

function checkBurn(incomingAttack, attackingPokemon){
    if(attackingPokemon.statusCondition === StatusConditions.burn && incomingAttack.kindOfMove === KindOfMove.physical){
        return 0.5;
    } else {
        return 1;
    }
}

function checkSTAB(incomingAttack, attackingPokemon){
    if(incomingAttack.type === attackingPokemon.type1 || incomingAttack.type === attackingPokemon.type2){
        return 1.5;
    } else {
        return 1;
    }
}

function calcWeatherMod(incomingAttack){
    var mod = 1;
    if(environment.weather !== null && environment.weather.active){
        if(environment.weather.name === "rain" && incomingAttack.type.name === "water"){
            mod = 1.5;
        } else if (environment.weather.name === "rain" && incomingAttack.type.name === "fire"){
            mod = 0.5;
        } else if (environment.weather.name === "sunlight" && incomingAttack.type.name === "fire"){
            mod = 1.5;
        } else if (environment.weather.name === "sunlight" && incomingAttack.type.name === "water"){
            mod = 0.5;
        }
    }
    return mod;
}

function criticalHit(){
    // https://bulbapedia.bulbagarden.net/wiki/Critical_hit
    //TODO A lot with critical hits

    var mod = 1;
    var baseChance = 24; //Kan 1/2/8/24 zijn
    var chance = 1 / baseChance;
    var random = Math.ceil(Math.random() * baseChance);
    if(random <= chance){
        mod = 1.5;
        console.log("Critical hit!");
    }

    return mod;
}

function selectMoveEnemy() {
    //TODO implement logic
    var random = Math.ceil(Math.random() * 4);
    console.log("Enemy move:", random);
    return "move" + random;
}

function performTurn(move) {
    //TODO Implement speed check
    var gameObj = getStoredObject("game");
    var updatedPokemon = attack(gameObj.chosenPokemon, gameObj.enemyPokemon, move); //Perform turn of player
    updatePokemon(gameObj, updatedPokemon[0], updatedPokemon[1]);
    refreshAllInfo(gameObj);
    checkForEnding(gameObj);
    var enemyMove = selectMoveEnemy();
    updatedPokemon = attack(gameObj.enemyPokemon, gameObj.chosenPokemon, enemyMove); //Perform turn of enemy
    updatePokemon(gameObj, updatedPokemon[1], updatedPokemon[0]);
    refreshAllInfo(gameObj);
    checkForEnding(gameObj);
    storeObject("game", gameObj);
}

function checkForEnding(gameObj){
    if(gameObj.enemyPokemon.hpLeft <= 0){
        storeSingleItem("victory", "win");
        window.location.href = "../pages/endScreen.html";
    } else if(gameObj.chosenPokemon.hpLeft <= 0){
        storeSingleItem("victory", "lose");
        window.location.href = "../pages/endScreen.html";
    }
}

function refreshAllInfo(gameObj){
    refreshEnemyInfo(gameObj.enemyPokemon);
    refreshAllyInfo(gameObj.chosenPokemon);
}

function updatePokemon(gameObj, ally, enemy){
    gameObj.chosenPokemon = ally;
    gameObj.enemyPokemon = enemy;
}

function attack(attacker, defender, move){
    var damage = calculateDamage(attacker, defender, move);
    console.log("Damage:", damage);
    if(defender.hpLeft - damage > 0){
        defender.hpLeft -= damage;
    } else {
        defender.hpLeft = 0;
    }
    if(attacker.moveSet[move].effects){
        attacker.moveSet[move].effects.forEach(function (effect) {
            var statsChanges = applyEffect(attacker, defender, effect);
            attacker.statChanges = statsChanges[0];
            defender.statChanges = statsChanges[1];
        });
    }
    return [attacker, defender];
}