function Pokemon(name, type1, type2, baseStats, moveSet){
    this.name = name;
    this.type1 = type1;
    this.type2 = type2;
    this.baseStats = baseStats; //dict of baseStats
    this.stats = generateStats(baseStats);
    this.moveSet = moveSet; //dict of moves
    this.statChanges = generateStatChangeDict(); //dict of statChanges
    this.statusCondition = null;
    this.confused = false;
    this.level = 100;
    this.sprite = name + ".gif".toLowerCase();
    this.backSprite = name + "-back.gif".toLowerCase();
    this.hpLeft = this.stats.hp;
}

function generateStatChangeDict() {
    return {
        "attack": {
            top: 2, //Change when increased
            bottom: 2 //Change when decreased
        },
        "specialAttack": {
            top: 2,
            bottom: 2
        },
        "defence": {
            top: 2,
            bottom: 2
        },
        "specialDefence": {
            top: 2,
            bottom: 2
        },
        "speed": {
            top: 2,
            bottom: 2
        }
    }
}

function generateStats(baseStats) {
    return {
        hp: calculateHpStat(baseStats.hp),
        attack: calculateOtherStats(baseStats.attack),
        defence: calculateOtherStats(baseStats.defence),
        specialAttack: calculateOtherStats(baseStats.specialAttack),
        specialDefence: calculateOtherStats(baseStats.defence),
        speed: calculateOtherStats(baseStats.speed)
    }
}
function calculateHpStat(baseHp) {
    var hp = (((2 * baseHp + 31 + 0) * 100) / 100) + 100 + 10;
    hp = Math.ceil(hp);
    return hp;
}
//TODO eventueel Natures
function calculateOtherStats(stat){
    var finalStat = (((2 * stat + 31 + 0) * 100) / 100) + 5;
    finalStat = Math.ceil(finalStat);
    return finalStat;
}