// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
    this.score = 0;
    this.speed1 = 150; 
  }

  init(data) {
    if (data && data.score !== undefined) {
      this.score = data.score; 
    }
    if (data && data.speed1 !== undefined) {
      this.speed1 = data.speed1; 
    }
  }

  preload() {
    // load assets
    this.load.image("backg", "./public/backgroundbrillo.png");
    this.load.image("head", "./public/ball.png");
    this.load.image("brickss", "./public/brick.png");
    this.load.image("plataform", "./public/plataform.png");
    this.load.image("bomb", "./public/bomb.jpg");
    this.load.image("floor", "./public/Floor.png");
  }

  create() {
  this.physics.world.setBoundsCollision(true, true, true, false);
  
  this.backg = this.add.image(500, 300, "backg");

  this.floor = this.physics.add.staticGroup();
  this.floor.create(100, 590, "floor").setScale(0.3).refreshBody();
  this.floor.create(380, 590, "floor").setScale(0.3).refreshBody();
  this.floor.create(660, 590, "floor").setScale(0.3).refreshBody();
  this.floor.create(940, 590, "floor").setScale(0.3).refreshBody();
  

  this.plataform = this.physics.add.image(500, 550, "plataform").setScale(0.15);
  this.plataform.setImmovable();
  this.plataform.body.allowGravity = false;
  this.plataform.setCollideWorldBounds(true);

  this.balls = this.physics.add.group({
    key: "head",
    repeat: 0,
    setXY: { x: 400, y: 280 }
  });

  this.balls.children.iterate((ball) => {
    ball.setScale(0.3)
    ball.setCollideWorldBounds(true);
    ball.setBounce(1, 1);
    ball.setVelocity(this.speed1, this.speed1);
  });

  //this.ball = this.physics.add.image(500, 520, "ball").setScale(0.3);
  //this.ball.setCollideWorldBounds(true);
  //this.ball.setBounce(1);

  this.bricks = this.physics.add.staticGroup();
  this.brickCreate();

  //this.bricks = this.physics.add.staticGroup();
  //this.bricks.create(400, 100, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(500, 100, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(600, 100, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(700, 100, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(800, 100, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(200, 100, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(300, 100, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(200, 200, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(300, 200, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(400, 200, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(500, 200, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(600, 200, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(700, 200, "brick").setScale(0.2).refreshBody();
  //this.bricks.create(800, 200, "brick").setScale(0.2).refreshBody();


  this.physics.add.collider(this.balls, this.plataform, this.plataformTouch, null, this);
  this.physics.add.collider(this.balls, this.bricks, this.brickDestroy, null, this);
  this.physics.add.collider(this.balls, this.floor, this.ballDestroy, null, this);
  
  //this.cursors = this.input.keyboard.createCursorKeys();

  this.input.on("pointermove", (pointer) => {
    this.plataform.x = pointer.x;
    this.plataform.x = Phaser.Math.Clamp(this.plataform.x, 50, 1000);
  });

  this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
    fontSize: "32px",
    fill: "#fff",
  });

  this.bombs = this.physics.add.group();
  this.physics.add.overlap(this.plataform, this.bombs, this.explotion, null, this);

  }

  brickCreate() {
    this.rows = 2;
    this.columns = 6;
    this.brick = null;
    for (this.y = 0; this.y < this.rows; this.y++) {
      for (this.x = 0; this.x < this.columns; this.x++) {
        this.brick = this.bricks.create(120 + this.x * 150, 100 + this.y * 60, "brickss").setScale(0.2).refreshBody();
        this.brick.life = Phaser.Math.Between(1, 3); 
        this.brick.ballCreate = Phaser.Math.Between(0, 1) === 1; 
        this.brick.bombCreate = Phaser.Math.Between(0, 1) === 1; 
      }
    }
  }

  brickDestroy(ball, brick) {
    brick.life--;
    if (brick.life <= 0) {
    brick.destroy()
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
    }

    if (brick.ballCreate) {
      this.ballCreate(brick.x, brick.y);
    }

    if (brick.bombCreate) {
      this.bombCreate(brick.x, brick.y);
    }

    if (this.bricks.countActive() === 0) {
      console.log("funka")
      this.speed1 *= 1.1;
      this.time.delayedCall(500, () => {
      this.scene.restart({ score: this.score, speed1: this.speed1 });
      })
      }
  }

  ballCreate(x, y) {
    var newball = this.balls.create(x, y, "head");
    newball.setScale(0.3)
    newball.setCollideWorldBounds(true);
    newball.setBounce(1, 1);
    newball.setVelocity(this.speed1, this.speed1);
  }

  bombCreate(x, y) {
    var newbomb = this.bombs.create(x, y, "bomb").setScale(0.2).body.setSize(200, 200);
    newbomb.setVelocity(0, 200); 
  }

  ballDestroy(ball, floor) {
    ball.destroy();
  }

  explotion(plataform, bomb) {
    this.scene.start("Gameover", { score: this.score });
  }

  update() {
    if (this.balls.countActive() === 0) {
      this.scene.start("Gameover", { score: this.score });
    }
  }

}
