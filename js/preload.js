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
        this.load.image('bigArrow', 'img/bigArrow.png');

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