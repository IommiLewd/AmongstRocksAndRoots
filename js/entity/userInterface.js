class UserInterface extends Phaser.Sprite {
    constructor(game, difficulty, shipType) {
        super(game, difficulty, shipType);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        console.log('ui loaded');
        this._addRadar();
    }



    _addRadar() {
        this.radar = this.game.add.sprite(5, 360, 'radar');
        this.radar.anchor.setTo(0.0, 0.1);
        this.radar.fixedToCamera = true;
        this.horizontalBar = this.game.add.sprite(7, 0, 'verticalRadar');
        this.horizontalBar.fixedToCamera = true;
        this.verticalBar = this.game.add.sprite(7, 354, 'horizontalRadar');
        this.verticalBar.fixedToCamera = true;
    }
    update() {

    }
}