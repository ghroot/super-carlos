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
    okButton: null,

    init: function() {
        var self = this;
        document.addEventListener("touchstart", function(evt) {
            switch (self.state) {
                case States.Splash:
                    self.state = States.Game;
                    self.bird.jump();
                    break;
                case States.Game:
                    self.bird.jump();
                    break;
                case States.Score:
                    var mx = evt.touches[0].clientX / self.canvas.scale;
                    var my = evt.touches[0].clientY / self.canvas.scale;
                    if (self.okButton.x < mx && mx < self.okButton.x + self.okButton.width &&
                        self.okButton.y < my && my < self.okButton.y + self.okButton.height
                    ) {
                        self.blocks.reset();
                        self.bird.reset();
                        self.score = 0;
                        self.state = States.Splash;
                    }
                    break;
            }
        });

        this.canvas = new Canvas(320, window.innerHeight);

        this.score = 0;
        this.best = localStorage.getItem("best") || 0;

        this.groundY = 400;

        this.state = States.Splash;

        var img = new Image();
        img.onload = function() {
            createSpritesFromAtlas(this, atlas);

            self.bird = new Bird(self.canvas.width / 2, self.groundY);
            self.blocks = new Blocks(self.canvas.width / 2);

            self.okButton = {
                x: (self.canvas.width - sprites.button_ok.width) / 2,
                y: Math.round(self.canvas.height * 0.75),
                width: sprites.button_ok.width,
                height: sprites.button_ok.height
            };

            self.run();
        };
        img.src = "resources/atlas.png";
    },

    update: function() {
        if (this.state === States.Game) {
            this.blocks.update();
            this.bird.update();
            this.checkCollisions();
        }
    },

    checkCollisions: function() {
        for (var i = 0, len = this.blocks.blocks.length; i < len; i++) {
            var block = this.blocks.blocks[i];
            if (this.bird.y - block.y <= 12) {
                if (block.enabled) {
                    block.y = this.bird.y - 12;
                    if (this.bird.velocity < 0) {
                        block.enabled = false;
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
                        this.score++;
                    } else {
                        this.best = Math.max(this.best, this.score);
                        localStorage.setItem("best", this.best);
                        game.state = States.Score;
                    }
                }
            } else if (block.y < -100) {
                this.blocks.blocks.splice(i, 1);
                i--;
                len--;
            }
        }
    },

    render: function(ctx) {
        ctx.fillStyle = "#70c5cf";
        ctx.fillRect(0, 0, this.canvas.width, this.groundY);

        sprites.background.draw(ctx, 0, this.groundY - sprites.background.height + 30);
        sprites.background.draw(ctx, sprites.background.width, this.groundY - sprites.background.height + 30);

        sprites.foreground.draw(ctx, 0, this.groundY);
        sprites.foreground.draw(ctx, sprites.foreground.width, this.groundY);

        if (this.blocks) {
            this.blocks.draw(ctx);
        }
        if (this.bird) {
            this.bird.draw(ctx);
        }

        var width2 = this.canvas.width / 2;

        if (this.state === States.Splash) {
            sprites.title.draw(ctx, width2 - sprites.title.width / 2, Math.round(this.canvas.height * 0.25));
            sprites.instructions.draw(ctx, width2 - sprites.instructions.width / 2, Math.round(this.canvas.height * 0.4));
        }
        if (this.state === States.Score) {
            sprites.game_over.draw(ctx, width2 - sprites.game_over.width / 2, Math.round(this.canvas.height * 0.25));
            sprites.score_pane.draw(ctx, width2 - sprites.score_pane.width / 2, Math.round(this.canvas.height * 0.35));
            drawNumber(ctx, sprites.numbers_small, width2 - 47, Math.round(this.canvas.height * 0.35) + 35, this.score, null, 10);
            drawNumber(ctx, sprites.numbers_small, width2 - 47, Math.round(this.canvas.height * 0.35) + 78, this.best, null, 10);
            sprites.button_ok.draw(ctx, this.okButton.x, this.okButton.y);
        } else {
            drawNumber(ctx, sprites.numbers_big, null, 20, this.score, width2);
        }
    },

    run: function() {
        var self = this;
        this.canvas.animate(function() {
            self.update();
            self.render(self.canvas.ctx);
        });
    }
});
