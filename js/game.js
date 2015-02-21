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
        var width = window.innerWidth;
        var height = window.innerHeight;
        var evt = "touchstart";
        if (width >= 500) {
            width  = 320;
            height = 480;
            evt = "mousedown";
        }
        document.addEventListener(evt, function(evt) {
            switch (self.state) {
                case States.Splash:
                    self.state = States.Game;
                    self.bird.jump();
                    break;
                case States.Game:
                    if (self.bird.onGround) {
                        self.bird.jump();
                    }
                    break;
                case States.Score:
                    var mx = evt.offsetX, my = evt.offsetY;
                    if (mx == null || my == null) {
                        mx = evt.touches[0].clientX;
                        my = evt.touches[0].clientY;
                    }
                    if (self.okButton.x < mx && mx < self.okButton.x + self.okButton.width &&
                        self.okButton.y < my && my < self.okButton.y + self.okButton.height
                    ) {
                        self.blocks.reset();
                        self.score = 0;
                        self.state = States.Splash;
                    }
                    break;
            }
        });

        this.canvas = new Canvas(width, height);

        this.score = 0;
        this.best = localStorage.getItem("best") || 0;

        this.state = States.Splash;

        var img = new Image();
        img.onload = function() {
            initSprites(this);

            self.groundY = height * 0.66;

            self.bird = new Bird(self.canvas.width / 2, self.groundY);
            self.blocks = new Blocks(self.canvas.width / 2);

            self.okButton = {
                x: (self.canvas.width - s_buttons.Ok.width) / 2,
                y: Math.round(self.canvas.height * 0.75),
                width: s_buttons.Ok.width,
                height: s_buttons.Ok.height
            };

            self.run();
        };
        img.src = "resources/sheet.png";
    },

    update: function() {
        if (this.state === States.Score) {
            this.best = Math.max(this.best, this.score);
            localStorage.setItem("best", this.best);
        }
        if (this.state === States.Game) {
            this.blocks.update();
        }

        if (this.bird) {
            this.bird.update();
        }

        if (this.state === States.Game) {
            this.checkCollisions();
        }
    },

    checkCollisions: function() {
        for (var i = 0, len = this.blocks.blocks.length; i < len; i++) {
            var block = this.blocks.blocks[i];
            if (this.bird.y - block.y <= 12) {
                if (block.enabled) {
                    block.y = this.bird.y - 12;
                    if (this.bird.velocity <= 0) {
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

        s_bg.draw(ctx, 0, this.groundY - s_bg.height + 30);
        s_bg.draw(ctx, s_bg.width, this.groundY - s_bg.height + 30);

        s_fg.draw(ctx, 0, this.groundY + 180);
        s_fg.draw(ctx, s_fg.width, this.groundY + 180);
        s_fg.draw(ctx, 0, this.groundY + 100);
        s_fg.draw(ctx, s_fg.width, this.groundY + 100);
        s_fg.draw(ctx, 0, this.groundY + 10);
        s_fg.draw(ctx, s_fg.width, this.groundY + 10);

        if (this.blocks) {
            this.blocks.draw(ctx);
        }
        if (this.bird) {
            this.bird.draw(ctx);
        }

        var width2 = this.canvas.width / 2;

        if (this.state === States.Splash) {
            s_text.GetReady.draw(ctx, width2 - s_text.GetReady.width / 2, Math.round(this.canvas.height * 0.25));
            s_splash.draw(ctx, width2 - s_splash.width/2, Math.round(this.canvas.height * 0.4));
        }
        if (this.state === States.Score) {
            s_text.GameOver.draw(ctx, width2 - s_text.GameOver.width / 2, Math.round(this.canvas.height * 0.25));
            s_score.draw(ctx, width2 - s_score.width / 2, Math.round(this.canvas.height * 0.35));
            s_numberS.draw(ctx, width2 - 47, Math.round(this.canvas.height * 0.35) + 35, this.score, null, 10);
            s_numberS.draw(ctx, width2 - 47, Math.round(this.canvas.height * 0.35) + 78, this.best, null, 10);
            s_buttons.Ok.draw(ctx, this.okButton.x, this.okButton.y);
        } else {
            s_numberB.draw(ctx, null, 20, this.score, width2);
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
