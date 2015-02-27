var ScoreState = Class.extend({

    init: function(game) {
        this.game = game;
        this.canvas = game.canvas;
        this.scoreContainer = new PIXI.DisplayObjectContainer();
        var game_over = PIXI.Sprite.fromFrame("game_over");
        game_over.anchor.x = 0.5;
        game_over.anchor.y = 0.5;
        game_over.x = this.canvas.width / 2;
        game_over.y = this.canvas.height * 0.25;
        this.scoreContainer.addChild(game_over);
        this.okButton = PIXI.Sprite.fromFrame("button_ok");
        this.okButton.buttonMode = true;
        this.okButton.interactive = true;
        this.okButton.x = this.canvas.width / 2;
        this.okButton.y = this.canvas.height * 0.8;
        this.okButton.anchor.x = 0.5;
        this.okButton.anchor.y = 0.5;
        this.scoreContainer.addChild(this.okButton);
    },

    onOkButtonTouch: function(interactionData) {
        self.game.blocks.reset();
        self.game.enemies.reset();
        self.game.bird.reset();
        self.game.score = 0;
        this.game.changeState(this.game.splashState);
    },

    enter: function() {
        this.canvas.stage.addChild(this.scoreContainer);
        this.okButton.touchstart = this.onOkButtonTouch.bind(this);
    },

    update: function() {

    },

    exit: function() {
        this.canvas.stage.removeChild(this.scoreContainer);
        this.okButton.touchstart = null;
    }
});
