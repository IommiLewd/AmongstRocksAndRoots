class SimpleLevel extends Phaser.State {
    constructor() {
        super();

    }

    _loadLevel(width) {
        console.log('simplelevel.js: -> _LoadLevel fired');
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this.game.world.setBounds(0, 0, width, 820);
        console.log('Load Level fired! Width is: ' + width);
        this.background = this.game.add.image(0, 0, 'background');
        this.background.fixedToCamera = true;
        this.starfield = this.game.add.tileSprite(0, 0, width, 820, 'starfield');
        this.starfield2 = this.game.add.tileSprite(0, 0, width, 820, 'starfield2');
    }

    _addPlayer(x, y) {
        this.player = new Player(this.game, 20, this.game.height / 2, 'bulwark');
        //this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
        this.game.camera.deadzone = new Phaser.Rectangle(140, 120, 100, 192);
        //this.starfield.anchor.setTo(0.5);
        //this.player.addChild(this.starfield);
    }

    _loadUi() {
        this.userInterface = new UserInterface(this.game);
    }

    _checkCollision() {}
    _radarUpdate() {
        this.userInterface.horizontalBar.cameraOffset.y = 354 + this.player.y / this.game.height * 36;
        this.userInterface.verticalBar.cameraOffset.x = 3 + this.player.x / this.game.width * 100;
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this._radarUpdate, this);
        console.log('radar updated');
    }


    init() {}
    preload() {}

    create() {
        this.levelWidth = 1620;
        this._loadLevel(this.levelWidth);
        this._addPlayer(100, 100);
        this._loadUi();
        this._radarUpdate();

    }

    update() {
       // this._radarUpdate();
        this.starfield2.tilePosition.x = this.player.x * -this.player.speed / 6;
        this.starfield2.tilePosition.y = this.player.y * -this.player.speed / 6;
        this.starfield.tilePosition.x = this.player.x * -this.player.speed / 5;
        this.starfield.tilePosition.y = this.player.y * -this.player.speed / 5;


    }

    render() {
        //var zone = this.game.camera.deadzone;

        //this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
        //game.context.fillRect(zone.x, zone.y, zone.width, zone.height);

        //this.game.debug.cameraInfo(game.camera, 32, 32);
        //this.game.debug.spriteCoords(player, 32, 500);



    }

}