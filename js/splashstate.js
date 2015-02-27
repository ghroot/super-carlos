var SplashState = Class.extend({

    init: function(game) {
        this.game = game;
        this.canvas = game.canvas;
        this.splashContainer = new PIXI.DisplayObjectContainer();
        var title = PIXI.Sprite.fromFrame("title");
        title.anchor.x = 0.5;
        title.anchor.y = 0.5;
        title.x = this.canvas.width / 2;
        title.y = this.canvas.height * 0.25;
        this.splashContainer.addChild(title);
        var instructions = PIXI.Sprite.fromFrame("instructions");
        instructions.anchor.x = 0.5;
        instructions.anchor.y = 0.5;
        instructions.x = this.canvas.width / 2;
        instructions.y = this.canvas.height * 0.5;
        this.splashContainer.addChild(instructions);
    },

    onTouch: function(interactionData) {
        this.game.changeState(this.game.gameState);
    },

    enter: function() {
        this.canvas.stage.addChild(this.splashContainer);
        this.canvas.stage.touchstart = this.onTouch.bind(this);
    },

    update: function() {
    },

    exit: function() {
        this.canvas.stage.removeChild(this.splashContainer);
        this.canvas.stage.touchstart = null;
    }
});
