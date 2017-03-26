class SimpleLevel extends Phaser.State {
    constructor(selectedShip) {
        super(selectedShip);

    }

    _loadLevel() {
        console.log('simplelevel.js: -> _LoadLevel fired');
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this.game.world.setBounds(0, 0, 920, 640);
        console.log('Load Level fired!');
        //        this.background = game.add.tileSprite(0, 0, 920, 640, 'background');
        //        this.overlay = game.add.tileSprite(-300, -300, 1020, 740, 'Overlay');
        //        this.overlay2 = game.add.tileSprite(-300, -300, 1020, 740, 'Overlay2');

    }

    _addPlayer(x, y) {
        this.player = new Player(this.game, this.game.width / 2, this.game.height / 2, 'bulwark');
        this.game.camera.follow(this.player);
    }

    _loadUi() {
        //        this.userInterface = new UserInterface(this.game, this._difficulty, this.shipType /* HERE !!!! */);
    }

    _checkCollision() {}



    init() {}
    preload() {}

    create() {
        this._loadLevel();
        this._addPlayer(100, 100);

    }

    update() {

    }

}