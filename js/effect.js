function Effect(raiseOrLower, applyStatusCondition, statusCondition, stat, percentage, effectsSelf){
    this.raiseOrLower = raiseOrLower;
    this.applyStatusCondition = applyStatusCondition;
    this.statusCondition = statusCondition;
    this.stat = stat;
    this.percentage = percentage;
    this.effectsSelf = effectsSelf;
}

function applyEffect(attacker, defender, effect) {
    var random = Math.ceil(Math.random() * 100);
    console.log(random);
    if(random <= effect.percentage) {
        if (effect.effectsSelf) {
            if (effect.raiseOrLower === "raise") {
                if (attacker.statChanges[effect.stat].top >= attacker.statChanges[effect.stat].bottom && attacker.statChanges[effect.stat].top !== 8) {
                    attacker.statChanges[effect.stat].top++;
                } else if (attacker.statChanges[effect.stat].top < attacker.statChanges[effect.stat].bottom) {
                    attacker.statChanges[effect.stat].bottom--;
                }
                console.log("Raised:", effect.stat);
            } else {
                if (attacker.statChanges[effect.stat].top > attacker.statChanges[effect.stat].bottom) {
                    attacker.statChanges[effect.stat].top--;
                } else if (attacker.statChanges[effect.stat].top <= attacker.statChanges[effect.stat].bottom && attacker.statChanges[effect.stat].bottom !== 8) {
                    attacker.statChanges[effect.stat].bottom++;
                }
                console.log("Lowered:", effect.stat);
            }
        } else {
            if (effect.raiseOrLower === "raise") {
                if (defender.statChanges[effect.stat].top >= defender.statChanges[effect.stat].bottom && defender.statChanges[effect.stat].top !== 8) {
                    defender.statChanges[effect.stat].top++;
                } else if (defender.statChanges[effect.stat].top < defender.statChanges[effect.stat].bottom) {
                    defender.statChanges[effect.stat].bottom--;
                }
                console.log("Raised:", effect.stat);
            } else {
                if (defender.statChanges[effect.stat].top > defender.statChanges[effect.stat].bottom) {
                    defender.statChanges[effect.stat].top--;
                } else if (defender.statChanges[effect.stat].top <= defender.statChanges[effect.stat].bottom && defender.statChanges[effect.stat].bottom !== 8) {
                    defender.statChanges[effect.stat].bottom++;
                }
                console.log("Lowered:", effect.stat);
            }
        }
    }
    return [attacker.statChanges, defender.statChanges];
}