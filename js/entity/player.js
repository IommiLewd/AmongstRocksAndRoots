class Player extends Phaser.Sprite {
    constructor(game, posx, posy, key, type, properties) {
        super(game, posx, posy, 'bulwark', 0, properties);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        this.body.drag.set(10);
        this._laserPointer();
        this.rotation = 3;
        this.speed = 40;
        this.TURN_RATE = 0.2;
    }


    _laserPointer() {

        this._laserPointer = this.game.add.tileSprite(0, 0, 1100, 0.5, 'pointer');
        this._laserPointer.anchor.setTo(0.0, 0.5);
        this._laserPointer.alpha = 0.5;
        this.wayMarker = this.game.add.image(130, 0, 'bigArrow');
        this._laserPointer.addChild(this.wayMarker);
        this.wayMarker.anchor.setTo(0.5);
    }



    update() {
        this._laserPointer.x = this.x;
        this._laserPointer.y = this.y;
        var delta = this._laserPointer.rotation - this.rotation;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (this.game.input.activePointer.rightButton.isDown) {
                    this._laserPointer.rotation = this.game.physics.arcade.angleToPointer(this);
        }
            if (delta > 0) {
                this.angle += this.TURN_RATE;
            } else {
                this.angle -= this.TURN_RATE;
            } 

        if (this.game.input.activePointer.leftButton.isDown) {
            //  this._fireWeapon();
        }

    }



}


