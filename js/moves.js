function Move(name, power, pp, kindOfMove, type, hasEffect, accuracy, effects){
    this.name = name;
    this.power = power;
    this.pp = pp;
    this.kindOfMove = kindOfMove;
    this.type = type;
    this.hasEffect = hasEffect;
    this.effects = effects || [];
    this.accuracy = accuracy;
}
