class Preload extends Phaser.State {
    preload() {
        //Load Webfont
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        // js scripts :
        this.load.script('player', 'js/entity/player.js');
        this.load.script('simpleLevel', 'js/map/simplelevel.js');
        this.load.script('MainMenu', 'js/map/mainmenu.js');
        this.load.script('smallEnemy', 'js/entity/smallEnemy.js');
        this.load.script('UserInterface', 'js/entity/userInterface.js');
        
        this.load.image('bulwark', 'img/bulwark.png');
        this.load.image('bigArrow', 'img/longArrow.png');
        this.load.image('flame', 'img/flame.png');
        this.load.image('background', 'img/background.png');
        this.load.image('engine', 'img/engine.png');
        this.load.image('starfield', 'img/starfield.png');
        this.load.image('starfield2', 'img/starfield2.png');
        this.load.image('radar', 'img/radar.png');
        this.load.image('verticalRadar', 'img/verticalRadar.png');
        this.load.image('horizontalRadar', 'img/horizontalRadar.png');
        this.load.image('statusBar', 'img/statusBar.png');

        // Pointers :
//         this.load.image('pointer', 'img/laserPointer.png');
//         this.load.image('redpointer', 'img/redlaserPointer.png');

    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('SimpleLevel', SimpleLevel);
        this.game.state.add('MainMenu', MainMenu);
        this.game.state.start('SimpleLevel');
        //this.game.state.start('MainMenu');
    }

}