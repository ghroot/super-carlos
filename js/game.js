var States = {
    Splash: 0,
    Game: 1,
    Score: 2
};

var Game = Class.extend({
    state: 0,
    score: 0,
    best: 0,
    groundY: 0,

    init: function() {
        this.canvas = new Canvas(320, window.innerHeight, 0x70c5cf);
    },

    onTouch: function(interactionData) {
        switch (this.state) {
            case States.Splash:
                this.canvas.stage.removeChild(this.splashContainer);
                this.state = States.Game;
                this.bird.jump();
                break;
            case States.Game:
                this.bird.jump();
                break;
        }
    },

    load: function() {
        var loader = new PIXI.AssetLoader(["resources/atlas.json"]);
        loader.onComplete = this.start.bind(this);
        loader.load();
    },

    start: function() {
        this.canvas.stage.touchstart = this.onTouch.bind(this);

        this.score = 0;
        this.best = localStorage.getItem("best") || 0;

        this.groundY = 400;

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

        this.bird = new Bird(this.canvas.width / 2, this.groundY);
        this.canvas.stage.addChild(this.bird.sprite);

        this.blocks = new Blocks(this.canvas);
        this.enemies = new Enemies(this.canvas, this.canvas.width + 40, this.groundY - 21);

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
        var self = this;
        this.okButton.touchstart = function(interactionData) {
            self.canvas.stage.removeChild(self.scoreContainer);
            self.blocks.reset();
            self.enemies.reset();
            self.bird.reset();
            self.score = 0;
            self.canvas.stage.addChild(self.splashContainer);
            self.state = States.Splash;
        };
        this.scoreContainer.addChild(this.okButton);

        this.splashContainer.x = -this.splashContainer.width;
        this.canvas.stage.addChild(this.splashContainer);
        new TWEEN.Tween(this.splashContainer).to({x: 0}, 400).easing(TWEEN.Easing.Quadratic.Out).start();
        this.state = States.Splash;

        this.canvas.animate(function() {
            self.update();
            TWEEN.update();
        });
    },

    update: function() {
        if (this.state === States.Game) {
            this.blocks.update();
            this.enemies.update();
            this.bird.update();
            this.checkCollisions();
        }

        for (var i = 0; i < this.enemies.enemies.length; i++) {
            this.enemies.enemies[i].updateSprite();
        }
        for (var i = 0; i < this.blocks.blocks.length; i++) {
            this.blocks.blocks[i].updateSprite();
        }
        this.bird.updateSprite();
    },

    checkCollisions: function() {
        for (var i = 0, len = this.blocks.blocks.length; i < len; i++) {
            var block = this.blocks.blocks[i];
            if (this.bird.y - block.y <= 43) {
                if (block.enabled) {
                    block.y = this.bird.y - 43;
                    if (this.bird.invincible > 0 || this.bird.velocity < 0) {
                        block.enabled = false;
                        block.sprite.alpha = 0.5;
                        block.gravity = 2;
                        if (Math.random() <= 0.5) {
                            block.velocityX = 4 + Math.random() * 2;
                            block.rotationSpeed = 5;
                        } else {
                            block.velocityX = -4 - Math.random() * 2;
                            block.rotationSpeed = -5;
                        }
                        block.velocityY = -20;
                        this.bird.y = block.y;
                        this.bird.velocity = -this.bird.velocity / 4;
                        this.bird.invincible = 15;
                        this.score++;
                    } else {
                        this.best = Math.max(this.best, this.score);
                        localStorage.setItem("best", this.best);
                        this.canvas.stage.addChild(this.scoreContainer);
                        game.state = States.Score;
                    }
                }
            } else if (block.y < -100) {
                this.canvas.stage.removeChild(block.sprite);
                this.blocks.blocks.splice(i, 1);
                i--;
                len--;
            }
        }
        for (var i = 0, len = this.enemies.enemies.length; i < len; i++) {
            var enemy = this.enemies.enemies[i];
            if (Math.abs(this.bird.x - enemy.x) <= 36 && this.groundY - this.bird.y <= 40) {
                if (enemy.enabled) {
                    if (this.bird.velocity > 0) {
                        enemy.enabled = false;
                        enemy.sprite.alpha = 0.5;
                        enemy.gravity = 2;
                        this.bird.y = this.groundY - 40;
                        this.bird.velocity = -20;
                        this.score++;
                    } else {
                        this.best = Math.max(this.best, this.score);
                        localStorage.setItem("best", this.best);
                        this.canvas.stage.addChild(this.scoreContainer);
                        game.state = States.Score;
                    }
                }
            } else if (enemy.x < -50 || enemy.y > this.canvas.height + 50) {
                this.canvas.stage.removeChild(enemy.sprite);
                this.enemies.enemies.splice(i, 1);
                i--;
                len--;
            }
        }
    },

    render: function(ctx) {
        //if (this.state === States.Score) {
        //    sprites.score_pane.draw(ctx, width2 - sprites.score_pane.width / 2, Math.round(this.canvas.height * 0.35));
        //    drawNumber(ctx, sprites.numbers_small, width2 - 47, Math.round(this.canvas.height * 0.35) + 35, this.score, null, 10);
        //    drawNumber(ctx, sprites.numbers_small, width2 - 47, Math.round(this.canvas.height * 0.35) + 78, this.best, null, 10);
        //} else {
        //    drawNumber(ctx, sprites.numbers_big, null, 20, this.score, width2);
        //}
    }
});
