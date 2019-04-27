class Adaptor {
    static postPlayer(name){
       return fetch('https://mario-dodge-game-back-end.herokuapp.com/players',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        }).then(resp => {
            return resp.json()
        })
    }

    static postGame(player, score){
        return fetch('https://mario-dodge-game-back-end.herokuapp.com/games',{
             method: 'POST',
             headers: {
                 'content-type': 'application/json'
             },
             body: JSON.stringify({player_id: player.id, score: score})
         }).then(resp => resp.json())
     }

     static getAllGames(){
        return fetch('https://mario-dodge-game-back-end.herokuapp.com/games')
        .then(resp => resp.json())
     }

     static getPlayer(playerId){
       return fetch(`https://mario-dodge-game-back-end.herokuapp.com/players/${playerId}`)
        .then(res=> res.json())
     }

}