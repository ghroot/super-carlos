var ScoreState = Class.extend({

    init: function(game) {
        this.game = game;
        this.canvas = game.canvas;
        this.scoreContainer = new PIXI.DisplayObjectContainer();
        var gameOver = PIXI.Sprite.fromFrame("game_over");
        gameOver.anchor.x = 0.5;
        gameOver.anchor.y = 0.5;
        gameOver.x = this.canvas.width / 2;
        gameOver.y = this.canvas.height * 0.25;
        this.scoreContainer.addChild(gameOver);

        var scorePane = PIXI.Sprite.fromFrame("score_pane");
        scorePane.anchor.x = 0.5;
        scorePane.x = this.canvas.width / 2;
        scorePane.y = this.canvas.height * 0.35;
        this.scoreContainer.addChild(scorePane);
        this.scoreText = new PIXI.BitmapText("0", {font: "numbers_small"});
        this.scoreText.y = this.canvas.height * 0.35 + 36;
        this.scoreContainer.addChild(this.scoreText);
        this.bestText = new PIXI.BitmapText("0", {font: "numbers_small"});
        this.bestText.y = this.canvas.height * 0.35 + 78;
        this.scoreContainer.addChild(this.bestText);

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
        this.scoreText.setText(game.score.toString());
        this.bestText.setText(game.best.toString());
        this.canvas.stage.addChild(this.scoreContainer);
        this.okButton.touchstart = this.onOkButtonTouch.bind(this);
    },

    update: function() {
        this.scoreText.x = this.canvas.width / 2 + 88 - this.scoreText.textWidth;
        this.bestText.x = this.canvas.width / 2 + 88 - this.bestText.textWidth;
    },

    exit: function() {
        this.canvas.stage.removeChild(this.scoreContainer);
        this.okButton.touchstart = null;
    }
});
