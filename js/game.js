var Game = Class.extend({

    score: 0,
    best: 0,
    groundY: 400,

    init: function() {
        this.canvas = new Canvas(320, window.innerHeight, 0x70c5cf);
    },

    load: function() {
        var loader = new PIXI.AssetLoader(["resources/atlas.json", "resources/numbers_big.fnt", "resources/numbers_small.fnt"]);
        loader.onComplete = this.start.bind(this);
        loader.load();
    },

    start: function() {
        var sky = new PIXI.Graphics();
        sky.beginFill(0x70c5cf, 1);
        sky.drawRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.stage.addChild(sky);

        var backgroundTexture = PIXI.Texture.fromFrame("background");
        var background = new PIXI.TilingSprite(backgroundTexture, this.canvas.width, backgroundTexture.height);
        background.anchor.y = 1;
        background.y = this.groundY;
        this.canvas.stage.addChild(background);

        var groundTexture = PIXI.Texture.fromFrame("foreground");
        var ground = new PIXI.TilingSprite(groundTexture, this.canvas.width, groundTexture.height);
        ground.y = this.groundY;
        this.canvas.stage.addChild(ground);

        this.best = localStorage.getItem("best") || 0;

        this.bird = new Bird(this.canvas.width / 2, this.groundY);
        this.canvas.stage.addChild(this.bird.sprite);
        this.blocks = new Blocks(this.canvas);
        this.enemies = new Enemies(this.canvas, this.canvas.width + 40, this.groundY - 21);

        this.splashState = new SplashState(this);
        this.gameState = new GameState(this);
        this.scoreState = new ScoreState(this);

        this.changeState(this.splashState);

        var self = this;
        this.canvas.animate(function() {
            self.update();
            TWEEN.update();
        });
    },

    changeState: function(state) {
        if (this.state) {
            this.state.exit();
        }
        this.state = state;
        this.state.enter();
    },

    update: function() {
        this.state.update();

        for (var i = 0; i < this.enemies.enemies.length; i++) {
            this.enemies.enemies[i].updateSprite();
        }
        for (var i = 0; i < this.blocks.blocks.length; i++) {
            this.blocks.blocks[i].updateSprite();
        }
        this.bird.updateSprite();
    }
});
