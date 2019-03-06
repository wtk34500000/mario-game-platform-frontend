class Player{
    constructor(name){
        this.name=name;
        Player.all.push(this);
    }
}

Player.all=[];