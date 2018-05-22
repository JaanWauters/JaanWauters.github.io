function Weather(name, holdItem){
    this.name = name;
    this.turns = setTurns(holdItem);
    this.active = true;
    this.checkTurns = function(){
        if(turns === 0){
            this.active = false;
        }
    };
    this.reduceTurns = function(){
        this.turns--;
        this.checkTurns();
    };
}

function setTurns(holdItem){
    if(holdItem) return 8;
    else return 5;
}

