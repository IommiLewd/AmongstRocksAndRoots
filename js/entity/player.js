class Player extends Phaser.Sprite {
    constructor(game, posx, posy, key, type, properties) {
        super(game, posx, posy, 'bulwark', 0, properties);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        //this.body.drag.set(0.8);
        this.body.drag.set(2);

        this.fireRate = 200;
        this._nextFire = 0;

        this.turretGroup = this.game.add.group();
        this._laserPointer();
        this.turretArray = [
            //TurretSizes: 0 is small, 1 is medium and 2 s
              // [119, 21], [137, 21], [56, 40], [15, 51]
               [119, 21, 1, 'AHEPT CANNON', 'turret'], [137, 21, 1, 'AHEPT CANNON', 'turret'], [56, 40, 0, 'Disruptor', 'turret'], [15, 51, 2, 'Medium Rail', 'railgun']
            ];
        this.speed = 10;
        this.TURN_RATE = 0.3;
        this._thruster();
        this.body.maxVelocity.set(12);
        this._addTurrets();
        this._initBullets();
        this.currentTurret = 0;

    }


    _laserPointer() {
        this.wayMarker = this.game.add.image(130, 0, 'bigArrow');
        this.wayMarker.anchor.setTo(0.0, 0.5);
        this.speedIndicator = this.game.add.tileSprite(114, -2, 55, 6, 'speedSprite');
        this.wayMarker.addChild(this.speedIndicator);
        this.speedIndicator.visible = false;
        this.wayMarkerEnd = this.game.add.image(210, 0, 'arrow');
        this.wayMarkerEnd.anchor.setTo(0.5);
        this.wayMarker.addChild(this.wayMarkerEnd);
        this.wayMarkerEnd.visible = false;

    }

    _addTurrets() {
        for (var i = 0, len = this.turretArray.length; i < len; i++) {
            this.turret = this.game.add.sprite(this.turretArray[i][0] - this.width / 2, this.turretArray[i][1] - this.height / 2, this.turretArray[i][4]);
            this.turret.anchor.setTo(0.2, 0.5);
            this.turretGroup.add(this.turret);
            this.addChild(this.turretGroup);
        }
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






    _fireWeapon() {
        this.bullet;
        if (this.game.time.now > this._nextFire) {
            if (this.currentTurret >= this.turretGroup.length) {
                this.currentTurret = 0;
            }
            this._nextFire = this.game.time.now + this.fireRate;
            this.bullet = this.bullets.getFirstDead();
            this.bullet.reset(this.turretGroup.children[this.currentTurret].world.x, this.turretGroup.children[this.currentTurret].world.y);
            this.game.camera.shake(0.004, 40);
            var testRotation = this.turretGroup.children[this.currentTurret].rotation += this.rotation;
            this.game.physics.arcade.velocityFromRotation(testRotation, 1100, this.bullet.body.velocity);
            this.bullet.angle = this.turretGroup.children[this.currentTurret].angle;
            this.currentTurret++;
            this.bullet.bringToTop();
            this.bullets.add(this.bullet);
        }
    }

    _initBullets() {
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(50, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        //  --- Disable Gravity for Each Bullet
        this.bullets.forEach(function (L) {
            L.body.allowGravity = false;

        })
    }









    update() {
        this.turretGroup.forEach(function (turret) {
            turret.rotation = this.game.physics.arcade.angleToPointer(this);
            turret.rotation -= this.rotation;
        }, this);
        this.wayMarker.x = this.x;
        this.wayMarker.y = this.y;
        var delta = this.wayMarker.rotation - this.rotation;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;
        //var evaluator = this.game.input.worldX - this.world.x;
        if (this.game.input.activePointer.rightButton.isDown /* && evaluator > 0*/ ) {
            this.wayMarkerEnd.visible = true;
            this.speedIndicator.visible = true;
            this.wayMarker.rotation = this.game.physics.arcade.angleToPointer(this);
            var length = this.game.physics.arcade.distanceToPointer((this));
            if (length < 220 && length > 118) {

                this.speedIndicator.width = 0;
                this.speedIndicator.width = length - 119;
                var distance = length - 118;
                var speed = distance / 102 * 20;
                this.speed = speed / 5;
                this.emitter.lifespan = this.speed * 45;
                if (this.speed < 0.3) {
                    this.speed = 0;
                    this.speedIndicator.width = 0;
                    this.emitter.on = false;
                } else {
                    this.emitter.on = true;
                }
            }
        } else {
            this.speedIndicator.visible = false;
            this.wayMarkerEnd.visible = false;
        }

        if (delta > 0) {
            this.angle += this.TURN_RATE;
        } else {
            this.angle -= this.TURN_RATE;
        }

        this.body.acceleration.x = Math.cos(this.rotation) * this.speed;
        this.body.acceleration.y = Math.sin(this.rotation) * this.speed;

        if (this.game.input.activePointer.leftButton.isDown) {
            this._fireWeapon();
        }


    }
}



//        if (this.game.input.activePointer.leftButton.isDown) {
//            //  this._fireWeapon();
//        }