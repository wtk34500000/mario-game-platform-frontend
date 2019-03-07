// var config = {
//     type: Phaser.AUTO,
//     width: 1000,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 300 },
//             debug: false
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };

// var player;
// var stars;
// var bombs;
// var platforms;
// var cursors;
// var score = 0;
// var gameOver = false;
// var scoreText;

// var game = new Phaser.Game(config)

// function preload ()
// {
//     this.load.image('sky', 'assets/sky.png');
//     this.load.image('ground', 'assets/platform.png');
//     this.load.image('star', 'assets/star.png');
//     this.load.image('bomb', 'assets/bomb.png');
//     this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 60, frameHeight: 64 });
// }

// function create ()
// {
//     //  A simple background for our game
//     this.add.image(400, 300, 'sky').setScale(1.5);
    

//     //  The platforms group contains the ground and the 2 ledges we can jump on
//     platforms = this.physics.add.staticGroup();

//     //  Here we create the ground.
//     //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
//     platforms.create(400, 568, 'ground').setScale(3).refreshBody();

//     //  Now let's create some ledges
//     platforms.create(600, 400, 'ground');
//     platforms.create(50, 250, 'ground');
//     platforms.create(750, 220, 'ground');

//     // The player and its settings
//     player = this.physics.add.sprite(100, 450, 'dude');

//     //  Player physics properties. Give the little guy a slight bounce.
//     player.setBounce(0.1);
//     player.setCollideWorldBounds(true);

//     //  Our player animations, turning, walking left and walking right.
//     if(!gameOver){
//         this.anims.create({
//             key: 'left',
//             frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
//             frameRate: 15,
//             repeat: -1
//         });

//         this.anims.create({
//             key: 'turn',
//             frames: [ { key: 'dude', frame: 5 } ],
//             frameRate: 10
//         });

//         this.anims.create({
//             key: 'right',
//             frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 8 }),
//             frameRate: 15,
//             repeat: -1
//         });
//     }
//     //  Input Events
//     cursors = this.input.keyboard.createCursorKeys();
//     let randNum=Math.floor(Math.random()*10)+6
//     let randX=Math.floor(Math.random()*10)+30
//     let randY=Math.floor(Math.random()*-70)+30
//     // let randSpace=Math.floor(Math.random()*100)+30
//     //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
//     stars = this.physics.add.group({
//         key: 'star',
//         repeat: 0,
//         setXY: { x: randX, y: 0, stepX: 65, stepY: randY }
//     });

//     stars.children.iterate(function (child) {

//         //  Give each star a slightly different bounce
//         child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

//     });

//     bombs = this.physics.add.group();

//     //  The score
//     scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

//     //  Collide the player and the stars with the platforms
//     this.physics.add.collider(player, platforms);
//     this.physics.add.collider(stars, platforms);
//     this.physics.add.collider(bombs, platforms);

//     //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
//     this.physics.add.overlap(player, stars, collectStar, null, this);

//     this.physics.add.collider(player, bombs, hitBomb, null, this);

    
// }

// function update ()
// {
//     if (gameOver)
//     {

//         const button=document.querySelector('.button')
//         button.addEventListener('click',(e)=>{
//             if(e.target.className ==="button"){
//                 gameOver=false;
//                 this.scene.restart();
//             }
//         })
//     }

//     if (cursors.left.isDown)
//     {
//         player.setVelocityX(-160);

//         player.anims.play('left', true);
//     }
//     else if (cursors.right.isDown)
//     {
//         player.setVelocityX(160);

//         player.anims.play('right', true);
//     }
//     else
//     {
//         player.setVelocityX(0);

//         player.anims.play('turn');
//     }

//     if (cursors.space.isDown && player.body.touching.down)
//     {
//         player.setVelocityY(-330);
//     }
// }

// var scor = new Audio()
// scor.src = "sounds/score.mp3"

// function collectStar (player, star)
// {
//     star.disableBody(true, true);

//     //  Add and update the score
//     score += 10;
//     scor.play();
//     scoreText.setText('Score: ' + score);

//     if (stars.countActive(true) === 0)
//     {
//         //  A new batch of stars to collect
//         stars.children.iterate(function (child) {

//             child.enableBody(true, child.x, 0, true, true);

//         });

//         var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

//         var bomb = bombs.create(x, 16, 'bomb');
//         bomb.setBounce(1);
//         bomb.setCollideWorldBounds(true);
//         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
//         bomb.allowGravity = false;

//     }
// }

// function hitBomb (player, bomb)
// {
//     this.physics.pause();
//     player.setTint(0xff0000);

//     player.anims.play('turn');
//     gameOver = true;

//     const name=prompt('Name: ')
//     Adaptor.postPlayer(name).then(player => {
//         //  new Player(player.name);
//         Adaptor.postGame(player, score).then(game => {
//             Adaptor.getAllGames().then(games =>{
        
//                 scoreBoard(games)
//             })
//         })
//     })
// }

// function scoreBoard(games){
//         Game.all=[]
//         games.forEach((game)=>{
//             new Game(game)
//         })
//         const sortedArray=Game.all.sort((a, b) => b.score - a.score).slice(0, 10)
//         const table = document.querySelector('.score-board')
//         while(table.hasChildNodes()){
//             table.removeChild(table.firstChild);
//         }
//         sortedArray.forEach(game => {
//                 Adaptor.getPlayer(game.player_id)
//                 .then(player =>{
//                     table.innerHTML += game.render(player.name)
//                     }
//                 )
//         })

// }

