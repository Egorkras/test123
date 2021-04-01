var config={type:Phaser.AUTO,backgroundColor:"#4EC0C9",scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:288,height:512},physics:{"default":"arcade",arcade:{gravity:{y:1200},debug:!1}},scene:{preload:preload,create:create,update:update}},assets={player:"player",obstacle:{pipe:{blue:{top:"pipe-blue-top",bottom:"pipe-blue-bottom"},yellow:{top:"pipe-yellow-top",bottom:"pipe-yellow-bottom"}}},scene:{width:144,background:{day:"background-day",night:"background-night"},ground:"ground",
gameOver:"game-over",highScoreBanner:"high-score",restart:"restart-button",messageInitial:"message-initial"},scoreboard:{width:25,base:"number",number0:"number0",number1:"number1",number2:"number2",number3:"number3",number4:"number4",number5:"number5",number6:"number6",number7:"number7",number8:"number8",number9:"number9"},animation:{player:{clapWings:"clap-wings",stop:"stop"},ground:{moving:"moving-ground",stop:"stop-ground"}}},playerJumpVelocity=-360,FPS=60,pipeSpeed=-115,pipeDistance=1500,game=
new Phaser.Game(config),gameOver,gameStarted,upButton,restartButton,gameOverBanner,messageInitial,player,birdName,backgroundDay,backgroundNight,group,gapsGroup,nextPipes,currentPipe,scoreboardGroup,score,death1,death2,jump,highScoreBanner,es=btoa("score"),ez=btoa("0"),pullScore=localStorage.getItem(es)||ez;console.log(atob(pullScore));var highScore=parseInt(atob(pullScore));
function preload(){this.physics.world.setFPS(FPS);this.load.image(assets.scene.background.day,"assets/background-day.png");this.load.image(assets.scene.background.night,"assets/background-night.png");this.load.spritesheet(assets.scene.ground,"assets/ground-sprite.png",{frameWidth:336,frameHeight:112});this.load.image(assets.obstacle.pipe.blue.top,"assets/pipe-blue-top.png");this.load.image(assets.obstacle.pipe.blue.bottom,"assets/pipe-blue-bottom.png");this.load.image(assets.obstacle.pipe.yellow.top,
"assets/pipe-yellow-top.png");this.load.image(assets.obstacle.pipe.yellow.bottom,"assets/pipe-yellow-bottom.png");this.load.image(assets.scene.messageInitial,"assets/message-initial.png");this.load.image(assets.scene.gameOver,"assets/gameover.png");this.load.image(assets.scene.restart,"assets/restart-button.png");this.load.image(assets.scene.highScoreBanner,"assets/high-score.png");this.load.spritesheet(assets.player,"assets/player.png",{frameWidth:35,frameHeight:24});this.load.image(assets.scoreboard.number0,
"assets/number0.png");this.load.image(assets.scoreboard.number1,"assets/number1.png");this.load.image(assets.scoreboard.number2,"assets/number2.png");this.load.image(assets.scoreboard.number3,"assets/number3.png");this.load.image(assets.scoreboard.number4,"assets/number4.png");this.load.image(assets.scoreboard.number5,"assets/number5.png");this.load.image(assets.scoreboard.number6,"assets/number6.png");this.load.image(assets.scoreboard.number7,"assets/number7.png");this.load.image(assets.scoreboard.number8,
"assets/number8.png");this.load.image(assets.scoreboard.number9,"assets/number9.png");this.load.audio("death1",["assets/audio/mission-failed.mp3"]);this.load.audio("death2",["assets/audio/roblox-death.mp3"]);this.load.audio("jump",["assets/audio/jump.mp3"])}
function create(){backgroundDay=this.add.image(assets.scene.width,256,assets.scene.background.day).setInteractive();backgroundDay.on("pointerdown",playerJump);backgroundNight=this.add.image(assets.scene.width,256,assets.scene.background.night).setInteractive();backgroundNight.on("pointerdown",playerJump);gapsGroup=this.physics.add.group();pipesGroup=this.physics.add.group();scoreboardGroup=this.physics.add.staticGroup();scoreboardGroupGameOver=this.physics.add.staticGroup();ground=this.physics.add.sprite(assets.scene.width,
458,assets.scene.ground);ground.setCollideWorldBounds(!0);ground.setDepth(10);messageInitial=this.add.image(assets.scene.width,156,assets.scene.messageInitial);messageInitial.setDepth(30);messageInitial.visible=!1;upButton=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);this.anims.create({key:assets.animation.ground.moving,frames:this.anims.generateFrameNumbers(assets.scene.ground,{start:0,end:2}),frameRate:15,repeat:-1});this.anims.create({key:assets.animation.ground.stop,frames:[{key:assets.scene.ground,
frame:0}],frameRate:20});this.anims.create({key:assets.animation.player.clapWings,frames:this.anims.generateFrameNumbers(assets.player,{start:0,end:2}),frameRate:10,repeat:-1});this.anims.create({key:assets.animation.player.stop,frames:[{key:assets.player,frame:1}],frameRate:20});death1=this.sound.add("death1");death2=this.sound.add("death2");jump=this.sound.add("jump");prepareGame(this);highScoreBanner=this.add.image(assets.scene.width,70,assets.scene.highScoreBanner);highScoreBanner.setDepth(20);
highScoreBanner.visible=!1;gameOverBanner=this.add.image(assets.scene.width,210,assets.scene.gameOver);gameOverBanner.setDepth(20);gameOverBanner.visible=!1;restartButton=this.add.image(assets.scene.width,300,assets.scene.restart).setInteractive();restartButton.on("pointerdown",restartGame);restartButton.setDepth(20);restartButton.visible=!1}
function update(a,b){!gameOver&&gameStarted&&(0<framesMoveUp?framesMoveUp--:Phaser.Input.Keyboard.JustDown(upButton)?playerJump():90>player.angle&&(player.angle+=1),pipesGroup.children.iterate(function(c){void 0!=c&&(-50>c.x?c.destroy():c.setVelocityX(pipeSpeed))}),gapsGroup.children.iterate(function(c){c.body.setVelocityX(pipeSpeed)}),nextPipes+=b,nextPipes>=pipeDistance&&(makePipes(game.scene.scenes[0]),nextPipes=0))}
function playRandomDeathSound(){switch(Phaser.Math.Between(1,2)){case 1:death1.play();case 2:death2.play()}}
function playerHit(a){this.physics.pause();playRandomDeathSound();gameOver=!0;gameStarted=!1;a.anims.play(assets.animation.player.stop);ground.anims.play(assets.animation.ground.stop);gameOverBanner.visible=!0;restartButton.visible=!0;score>highScore&&(highScore=score,localStorage.setItem(es,btoa(String(highScore))));a=highScore.toString();if(1==a.length)scoreboardGroupGameOver.create(assets.scene.width,107,assets.scoreboard.base+highScore).setDepth(10);else for(var b=assets.scene.width-highScore.toString().length*
assets.scoreboard.width/2,c=0;c<a.length;c++)scoreboardGroupGameOver.create(b+10,107,assets.scoreboard.base+a[c]).setDepth(10),b+=assets.scoreboard.width;highScoreBanner.visible=!0;scoreboardGroupGameOver.visible=!0}
function updateScore(a,b){score++;b.destroy();0==score%10&&(backgroundDay.visible=!backgroundDay.visible,backgroundNight.visible=!backgroundNight.visible,currentPipe=currentPipe===assets.obstacle.pipe.yellow?assets.obstacle.pipe.blue:assets.obstacle.pipe.yellow);updateScoreboard(score)}
function makePipes(a){if(gameStarted&&!gameOver){var b=Phaser.Math.Between(-120,120);a=a.add.line(320,b+210,0,0,0,98);gapsGroup.add(a);a.body.allowGravity=!1;a.visible=!1;421==score?(pipesGroup.create(320,50,currentPipe.top).body.allowGravity=!1,pipesGroup.create(320,370,currentPipe.bottom).body.allowGravity=!1):(pipesGroup.create(320,b,currentPipe.top).body.allowGravity=!1,pipesGroup.create(320,b+420,currentPipe.bottom).body.allowGravity=!1)}}
function playerJump(){gameOver||(gameStarted||startGame(game.scene.scenes[0]),player.setVelocityY(playerJumpVelocity),player.angle=-15,framesMoveUp=5,jump.play())}
function updateScoreboard(a){scoreboardGroup.clear(!0,!0);var b=a.toString();if(1==b.length)scoreboardGroup.create(assets.scene.width,30,assets.scoreboard.base+a).setDepth(10);else{a=assets.scene.width-a.toString().length*assets.scoreboard.width/2;for(var c=0;c<b.length;c++)scoreboardGroup.create(a+10,30,assets.scoreboard.base+b[c]).setDepth(10),a+=assets.scoreboard.width}}
function restartGame(){pipesGroup.clear(!0,!0);pipesGroup.clear(!0,!0);gapsGroup.clear(!0,!0);scoreboardGroup.clear(!0,!0);scoreboardGroupGameOver.clear(!0,!0);player.destroy();gameOverBanner.visible=!1;restartButton.visible=!1;scoreboardGroupGameOver.visible=!1;highScoreBanner.visible=!1;var a=game.scene.scenes[0];prepareGame(a);a.physics.resume()}
function prepareGame(a){nextPipes=framesMoveUp=0;currentPipe=assets.obstacle.pipe.yellow;score=0;gameOver=!1;backgroundDay.visible=!0;backgroundNight.visible=!1;messageInitial.visible=!0;player=assets.player;player=a.physics.add.sprite(60,265,player);player.body.setSize(28,16);player.setCollideWorldBounds(!0);player.anims.play(assets.animation.player.clapWings,!0);player.body.allowGravity=!1;a.physics.add.collider(player,ground,playerHit,null,a);a.physics.add.collider(player,pipesGroup,playerHit,
null,a);a.physics.add.overlap(player,gapsGroup,updateScore,null,a);ground.anims.play(assets.animation.ground.moving,!0)}function startGame(a){gameStarted=!0;messageInitial.visible=!1;player.body.allowGravity=!0;scoreboardGroup.create(assets.scene.width,30,assets.scoreboard.number0).setDepth(20);makePipes(a)};