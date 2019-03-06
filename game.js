class Game {
    constructor(game){
        const{player_id, score}=game
        this.player_id=player_id;
        this.score=score;
        Game.all.push(this);
    }

    render(name){
        return `
             <tr><td>${name}</td><td>${this.score}</td></tr>
        `   
    }
}

Game.all=[];