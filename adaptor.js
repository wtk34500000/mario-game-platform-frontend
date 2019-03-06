class Adaptor {
    static postPlayer(name){
       return fetch('http://localhost:3000/players',{
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
        return fetch('http://localhost:3000/games',{
             method: 'POST',
             headers: {
                 'content-type': 'application/json'
             },
             body: JSON.stringify({player_id: player.id, score: score})
         }).then(resp => resp.json())
     }

     static getAllGames(){
        return fetch('http://localhost:3000/games')
        .then(resp => resp.json())
     }

}