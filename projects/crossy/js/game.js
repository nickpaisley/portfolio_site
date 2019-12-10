//create a new scene
let gameScene = new Phaser.Scene('Game');

//initiate scene parameters
gameScene.init = function (){
  //set player speed
  this.playerSpeed = 3;

  //enemy speed variables
  this.enemyMinSpeed = 1;
  this.enemyMaxSpeed = 3;

  //set boundaries
  this.enemyMinY = 80;
  this.enemyMaxY = 280;

  //we are not terminating
  this.isTerminating = false; 
};

//load assets
gameScene.preload = function(){
  //load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('enemy', 'assets/dragon.png');
  this.load.image('goal', 'assets/treasure.png');
};

//called once after the preload ends
gameScene.create = function(){
  //create background sprite
  let bg = this.add.sprite(0,0, 'background');

  // change the origin to the top-left corner
  bg.setOrigin(0,0);

  //create the player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

  //set player sprite size/scaling
  this.player.setScale(0.4, 0.4);

  //create player goal
  this.goal = this.add.sprite(550, this.sys.game.config.height / 2, 'goal');
  //set goal sprite size/scaling
  this.goal.setScale(0.6, 0.6);

  //create the enemy group
  this.enemies = this.add.group({
    key: 'enemy',
    repeat: 4,
    setXY: {
      x: 90,
      y: 100,
      stepX: 90,
      stepY: 20
    }    
  });

  //setting scale for all group elements
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.6, -0.6);

  //set flipx and speed
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
    //flip the enemy
    enemy.flipX = true;

    //set speed
    let dir = Math.random() < 0.5 ? 1 : -1;
    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    enemy.speed = dir * speed;
  }, this);
};
  
  //update player/enemy positions/movement
  gameScene.update = function(){

  //don't execute if we are terminating
  if (this.isTerminating) return;
  //check for active input
  if(this.input.activePointer.isDown){
     //player walks on activePointer
    this.player.x += this.playerSpeed;
  }
    
  //treasure overlap check
  let playerRect = this.player.getBounds();
  let treasureRect = this.goal.getBounds();
  if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)){
    console.log('You Win!')
    //restart the scene once goal is reached
    return this.scene.restart();
    
  }
  
  //get enemies
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for (let i = 0; i < numEnemies; i++){
    //enemy movement
  enemies[i].y += enemies[i].speed;

  //enemy min/max y axis check
  let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
  let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;

  //if we passed the upper or lower limit, reverse
  if (conditionUp || conditionDown){
    enemies[i].speed *= -1;
  }
  
  //check enemy overlap
  let enemyRect = enemies[i].getBounds();

  if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)){
    console.log('Game Over!')
    return this.gameOver();
  } 
  
}

};

gameScene.gameOver = function(){

  //initiaded game over sequence
  this.isTerminating = true;

  //shake camera
  this.cameras.main.shake(500);

  //listen for event completion
  this.cameras.main.on('camerashakecomplete', function(camera, effect){
  //fade out
  this.cameras.main.fade(500);
  }, this);
  
    //restart the scene on camera event completion
  
  
  this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
    this.scene.restart();
  }, this);
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