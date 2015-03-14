var Game = Class.extend({

    world: null,

    paused: false,
    slowMotion: false,
    slowMotionCountdown: 0,
    step: false,

    score: 0,
    best: 0,

    init: function() {
        this.parseConfig();
        this.createCanvas();

        window.addEventListener("keydown", this.onKeyDown.bind(this), false);
    },

    onKeyDown: function(evt) {
        if (evt.keyCode === 32) {
            this.paused = !this.paused;
            if (!this.paused) {
                this.slowMotion = false;
            }
        } else if (evt.keyCode === 40) {
            if (!this.slowMotion) {
                this.paused = false;
                this.slowMotion = true;
                this.slowMotionCountdown = 5;
            }
        } else if (evt.keyCode === 39) {
            this.slowMotion = false;
            if (this.paused) {
                this.update();
            } else {
                this.paused = true;
            }
        }
    },

    createCanvas: function() {
        this.canvas = new Canvas(320, window.innerHeight, 0x70c5cf);
    },

    parseConfig: function() {
        var vars = {};
        if (window) {
            window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
                vars[key] = value;
            });
        }
        this.config = {};
        this.config.groundY = parseInt(vars.groundY) || 400;
        this.config.birdJumpSpeed = parseFloat(vars.birdJumpSpeed) || 27;
        this.config.birdGravity = parseFloat(vars.birdGravity) || 1.8;
    },

    load: function() {
        var loader = new PIXI.AssetLoader(["resources/atlas.json", "resources/numbers_big.fnt", "resources/numbers_small.fnt"]);
        loader.onComplete = this.start.bind(this);
        loader.load();
    },

    start: function() {
        this.createBackDrop();
        this.createWorld();
        this.startUpdating();
    },

    createBackDrop: function() {
        var sky = new PIXI.Graphics();
        sky.beginFill(0x70c5cf, 1);
        sky.drawRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.stage.addChild(sky);

        var backgroundTexture = PIXI.Texture.fromFrame("background");
        var background = new PIXI.TilingSprite(backgroundTexture, this.canvas.width, backgroundTexture.height);
        background.anchor.y = 1;
        background.y = this.config.groundY;
        this.canvas.stage.addChild(background);

        var groundTexture = PIXI.Texture.fromFrame("foreground");
        var ground = new PIXI.TilingSprite(groundTexture, this.canvas.width, groundTexture.height);
        ground.y = this.config.groundY;
        this.canvas.stage.addChild(ground);
    },

    createWorld: function() {
        this.creator = new Creator(this.config);

        this.world = new KOMP.World();
        this.stateMachine = new KOMP.WorldStateMachine(this.world);

        this.world.addSystem(new InputSystem(this.canvas.stage), 1);
        this.world.addSystem(new ControlSystem(), 2);
        this.world.addSystem(new PhysicsSystem(), 3);
        this.world.addSystem(new BlockSpawningSystem(this.creator, this.canvas), 4);
        this.world.addSystem(new ScriptSystem(), 5);
        this.world.addSystem(new DisplaySystem(this.canvas.stage), 20);

        var bird = this.creator.createBird(this.canvas.width / 2, this.config.groundY);
        this.world.addEntity(bird);
    },

    startUpdating: function() {
        var self = this;
        this.canvas.animate(function() {
            self.update();
        });
    },

    update: function() {
        this.world.update(1 / 60);
        TWEEN.update();
    },

    startOld: function() {
        this.groundY = parseFloat(this.variables.groundY) || 400;

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

        this.bird = new Bird(this.canvas.width / 2, this.groundY, parseFloat(this.variables.birdGravity) || 1.8, parseFloat(this.variables.birdJumpSpeed) || 27, parseFloat(this.variables.birdBounceSpeed) || 20);
        this.canvas.stage.addChild(this.bird.sprite);
        this.blocks = new Blocks(this.canvas, this.variables);
        this.enemies = new Enemies(this.canvas, this.canvas.width + 40, this.groundY - 21, this.variables);

        this.splashState = new SplashState(this);
        this.gameState = new GameState(this);
        this.scoreState = new ScoreState(this);

        this.changeState(this.splashState);

        var self = this;
        this.canvas.animate(function() {
            if (self.paused) {
                return;
            }
            if (self.slowMotion) {
                self.slowMotionCountdown--;
                if (self.slowMotionCountdown === 0) {
                    self.slowMotionCountdown = 5;
                } else {
                    return;
                }
            }
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

    updateOld: function() {
        this.state.update();

        for (var i = 0; i < this.enemies.enemies.length; i++) {
            this.enemies.enemies[i].updateSprite();
        }
        for (i = 0; i < this.blocks.blocks.length; i++) {
            this.blocks.blocks[i].updateSprite();
        }
        this.bird.updateSprite();
    }
});
