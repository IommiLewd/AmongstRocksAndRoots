class Player extends Phaser.Sprite {
    constructor(game, posx, posy, key, type, properties) {
        super(game, posx, posy, 'bulwark', 0, properties);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        this.body.drag.set(0.8);
        this._laserPointer();
      
        this.speed = 10;
        this.TURN_RATE = 0.3;
        this._thruster();
        this.body.maxVelocity.set(25);
    }


    _laserPointer() {

        this.wayMarker = this.game.add.image(130, 0, 'bigArrow');
        this.wayMarker.anchor.setTo(0.0, 0.5);
        this.speedIndicator = this.game.add.tileSprite(114, -2, 200, 6, 'shieldPixel');
        this.wayMarker.addChild(this.speedIndicator);
        this.speedIndicator.visible = false;
    }

    _thruster() {
        this.emitter = this.game.add.emitter(-88, 0, 200);
        this.emitter.height = 50;
        this.emitter.makeParticles('flame');
        this.emitter.maxParticleSpeed = new Phaser.Point(-100, 50);
        this.emitter.minParticleSpeed = new Phaser.Point(-200, -50);
        this.emitter.minParticleScale = 0.5;
        this.emitter.maxParticleScale = 2.0;
        this.emitter.setRotation(0, 190);
        this.emitter.setAlpha(0.1, 0.6);
        this.emitter.forEach(function (particle) {
            particle.body.allowGravity = false;

        }, this);
        this.emitter.setScale(0.3, 2, 0.3, 2, 200);
        this.emitter.start(false, this.speed * 10, 1);
        this.addChild(this.emitter);
        this.engine = this.game.add.image(-99, -37, 'engine');
        this.addChild(this.engine);
    }


    update() {
        this.wayMarker.x = this.x;
        this.wayMarker.y = this.y;
        var delta = this.wayMarker.rotation - this.rotation;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;
        //var evaluator = this.game.input.worldX - this.world.x ;
        if (this.game.input.activePointer.rightButton.isDown/* && evaluator > 0*/) {
            this.speedIndicator.visible = true;
            this.wayMarker.rotation = this.game.physics.arcade.angleToPointer(this);
           var length = this.game.physics.arcade.distanceToPointer((this));
            //console.log(length);
            if(length < 220 && length > 118){
                this.speedIndicator.width = 0;
                this.speedIndicator.width = length - 118;
                var distance;
                distance = length - 118;
                var speed = distance / 102 * 25;
                this.speed = speed;
                  console.log(speed   );
                 this.emitter.lifespan = this.speed * 25;
                if(this.speed < 1.5){
                    this.speed = 0;
                    this.speedIndicator.width = 0;
                     this.emitter.on = false;
                } else {
                    this.emitter.on = true;
                }
               
            } 
        
        } else {
            this.speedIndicator.visible = false;
              
        }
        
        
        
        
        
        if (delta > 0) {
            this.angle += this.TURN_RATE;
        } else {
            this.angle -= this.TURN_RATE;
        }
        
        var firstEvaluator = Math.cos(this.rotation) * this.speed;
        firstEvaluator = Math.abs(firstEvaluator);
        var secondEvaluator = Math.abs(this.body.velocity.x);
        //var yEvaluator = Math.cos(this.rotation) * this.speed;
       // console.log(firstEvaluator + ' ... ... ' + secondEvaluator);
        if(firstEvaluator > secondEvaluator){
        this.body.velocity.x = Math.cos(this.rotation) * this.speed;
        this.body.velocity.y = Math.sin(this.rotation) * this.speed;
//        if (this.game.input.activePointer.leftButton.isDown) {
//            //  this._fireWeapon();
//        }

   }



}}