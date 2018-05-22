const types = {};

function Type(name, superEffective, resistance, immunity){
    this.name = name;
    this.superEffective = superEffective;
    this.resistance = resistance;
    this.immunity = immunity;
}

function isSupperEffective(incomingAttack, defendingPokemon){
    var atkType = incomingAttack.type;
    var defType = [
        defendingPokemon.type1,
        defendingPokemon.type2
    ];
    var result = 1;
    if(defType[0].immunity.includes(atkType.name) || defType[1] !== null && defType[1].immunity.includes(atkType.name)){
        return 0;
    }
    if(atkType.superEffective.includes(defType[0].name)){
        result *= 2;
    }
    if(defType[1] !== null && atkType.superEffective.includes(defType[1].name)){
        result *= 2;
    }
    if(defType[0].resistance.includes(atkType.name)){
        result /= 2;
    }
    if(defType[1] !== null && defType[1].resistance.includes(atkType.name)){
        result /= 2;
    }
    return result
}

function setTypes(){
    /*if(!localStorage.getItem("types")){*/
        types.normal = new Type("normal", [], [], ["ghost"]);
        types.ghost = new Type("ghost", ["psychic", "ghost"], ["poison", "bug"], ["normal", "fighting"]);
        types.fighting = new Type("fighting", ["ice", "rock", "steel", "dark", "normal"], ["bug", "rock", "dark"], []);
        types.psychic = new Type("psychic", ["fighting", "poison"], ["psychic", "fighting"], []);
        types.poison = new Type("poison", ["grass", "fairy"], ["grass", "poison", "fairy", "bug", "fighting"], []);
        types.fire = new Type("fire", ["grass", "ice", "bug", "steel"], ["grass", "fire", "ice", "fairy", "bug", "steel"], []);
        types.water = new Type("water", ["fire", "ground", "rock"], ["fire", "water", "ice", "steel"], []);
        types.grass = new Type("grass", ["water", "ground", "rock"], ["water", "electric", "grass", "ground"], []);
        types.electric = new Type("electric", ["water", "flying"], ["electric", "flying", "steel"], []);
        types.ice = new Type("ice", ["grass", "ground", "flying", "dragon"], ["ice"], []);
        types.ground = new Type("ground", ["flying", "electric", "poison", "rock", "steel"], ["poison", "rock"], ["electric"]);
        types.flying = new Type("flying", ["grass", "fighting", "bug"], ["grass", "fighting", "bug"], ["ground"]);
        types.fairy = new Type("fairy", ["fighting", "dragon", "dark"], ["bug", "fighting", "dark"], ["dragon"]);
        types.dragon = new Type("dragon", ["dragon"], ["fire", "water", "electric", "grass"], []);
        types.bug = new Type("bug", ["grass", "psychic", "dark"], ["grass", "fighting", "ground"], []);
        types.rock = new Type("rock", ["fire", "ice", "flying", "bug"], ["normal", "fire", "poison", "flying"], []);
        types.steel = new Type("steel", ["ice", "rock", "fairy"], ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"], []);
        types.dark = new Type("dark", ["psychic", "ghost"], ["ghost", "dark"], ["psychic"]);
        storeObject("types", types);
    /*} else {
        console.log("Types already stored."); //TODO Zet mij terug
    }*/
}