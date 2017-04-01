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
        
        this.load.image('bulwark', 'img/Bulwark.png');
        this.load.image('bigArrow', 'img/longArrow.png');
        this.load.image('arrow', 'img/arrow.png');
        this.load.image('speedSprite', 'img/speedSprite.png');
        this.load.image('flame', 'img/flame.png');
        this.load.image('turret', 'img/turret.png');
        this.load.image('railgun', 'img/railGun.png');
        this.load.image('disruptor', 'img/disruptor.png');
        this.load.image('bullet', 'img/bullet.png');
        this.load.image('gunButton', 'img/gunButton.png');
        this.load.spritesheet('bulletTile', 'img/bulletSheet.png', 36, 2);
        
        
        
        this.load.image('background', 'img/Background.png');
        this.load.image('engine', 'img/engine.png');
        this.load.image('starfield', 'img/starfield.png');
        this.load.image('starfield2', 'img/starfield1a.png');
        this.load.image('radar', 'img/UiItems/radar.png');
        
        
        
        this.load.image('verticalRadar', 'img/UiItems/verticalRadar.png');
        this.load.image('horizontalRadar', 'img/UiItems/horizontalRadar.png');
        this.load.image('statusBar', 'img/UiItems/statusBar.png');
        this.load.image('healthPixel', 'img/UiItems/healthPixel.png');
        this.load.image('shieldPixel', 'img/UiItems/shieldPixel.png');

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