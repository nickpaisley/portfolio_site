//create a new scene
let gameScene = new Phaser.Scene('Game');

//initiate scene parameters
gameScene.init = function (){

  //set player speed
  this.playerSpeed = 3;
};

//load assets
gameScene.preload = function(){
  
  //load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('enemy1', 'assets/dragon.png');
  this.load.image('goal', 'assets/treasure.png');
};

//called once after the preload ends
gameScene.create = function(){
  
  //create background sprite
  let bg = this.add.sprite(0,0, 'background');

  // change the origin to the top-left corner
  bg.setOrigin(0,0);

  //create the player
  this.player = this.add.sprite(50, this.sys.game.config.height / 2, 'player');

  //set player sprite size/scaling
  this.player.setScale(0.6, 0.6);

  //create the enemy
  this.enemy1 = this.add.sprite(70, 250, 'enemy1');

  //reverse enemy sprite position
  this.enemy1.flipX = true;

  //create player goal
  this.goal = this.add.sprite(550, this.sys.game.config.height / 2, 'goal');
  //set goal sprite size/scaling
  this.goal.setScale(0.6, 0.6);

};
  
  //update player/enemy positions/movement
  gameScene.update = function(){
       
  //check for active input
  if(this.input.activePointer.isDown){
 
    //player walks on activePointer
    this.player.x += this.playerSpeed;
  }
  
  //treasure overlap check
  let playerRect = this.player.getBounds();
  let treasureRect = this.goal.getBounds();

  if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)){
    //restart the scene once goal is reached
    this.scene.restart();
    return;
  }
  

};

// set the configuration of the game
let config = {
  type: Phaser.AUTO, // Phaser will use WebGl if avail, else Canvas. 
  width: 640,
  height: 360,
  scene: gameScene
}

// create a new game, pass the configuration
let game = new Phaser.Game(config)