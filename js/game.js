var Game = Class.extend({

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

        this.best = localStorage.getItem("best") || 0;
    },

    load: function() {
        var loader = new PIXI.AssetLoader([
            "resources/atlas.json",
            "resources/numbers_big.fnt",
            "resources/numbers_small.fnt"
        ]);
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

        this.worldContainer = new PIXI.DisplayObjectContainer();
        this.canvas.stage.addChild(this.worldContainer);

        this.debugContainer = new PIXI.DisplayObjectContainer();
        this.canvas.stage.addChild(this.debugContainer);
    },

    createWorld: function() {
        this.creator = new Creator(this.config, this.canvas);
        this.session = {
            gameOver: false
        };

        this.world = new KOMP.World();
        this.stateMachine = new KOMP.WorldStateMachine(this.world);

        var splashState = this.stateMachine.createState('splash');

        var playingState = this.stateMachine.createState('playing');
        playingState.addSystem(new JumpControlSystem(), 2);
        playingState.addSystem(new PhysicsSystem(), 3);
        playingState.addSystem(new BlockSpawningSystem(this.creator, this.canvas), 4);
        playingState.addSystem(new CollisionSystem([
            new BirdWithGroundCollisionHandler(),
            new BirdWithBlockCollisionHandler(this.world, this.session)
        ]), 5);
        playingState.addSystem(new PlayingStateEndingSystem(this.stateMachine, this.session));

        var scoreState = this.stateMachine.createState('score');

        this.world.addSystem(new InputSystem(this.canvas.stage), 1);
        this.world.addSystem(new ScriptSystem(), 6);
        this.world.addSystem(new CountdownSystem(), 7);
        this.world.addSystem(new DisplaySystem(this.worldContainer), 20);
        this.world.addSystem(new CollisionDisplaySystem(this.debugContainer), 20);

        this.stateMachine.changeState('playing');

        this.world.addEntity(this.creator.createGround(this.config.groundY));

        var bird = this.creator.createBird();
        this.world.addEntity(bird);
    },

    startUpdating: function() {
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
        });
    },

    update: function() {
        this.world.update(1 / 60);
        TWEEN.update();
    }
});
