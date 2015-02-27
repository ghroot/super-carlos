var GameState = Class.extend({

    init: function(game) {
        this.game = game;
        this.canvas = game.canvas;
        this.bird = game.bird;
        this.blocks = game.blocks;
        this.enemies = game.enemies;
    },

    onTouch: function(interactionData) {
        this.bird.jump();
    },

    enter: function() {
        this.canvas.stage.touchstart = this.onTouch.bind(this);
        this.bird.jump();
    },

    update: function() {
        this.blocks.update();
        this.enemies.update();
        this.bird.update();
        this.checkCollisions();
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
                        this.game.score++;
                    } else {
                        this.game.best = Math.max(this.game.best, this.game.score);
                        localStorage.setItem("best", this.best);
                        this.game.changeState(this.game.scoreState);
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
            if (Math.abs(this.bird.x - enemy.x) <= 36 && this.game.groundY - this.bird.y <= 40) {
                if (enemy.enabled) {
                    if (this.bird.velocity > 0) {
                        enemy.enabled = false;
                        enemy.sprite.alpha = 0.5;
                        enemy.gravity = 2;
                        this.bird.y = this.game.groundY - 40;
                        this.bird.velocity = -20;
                        this.game.score++;
                    } else {
                        this.game.best = Math.max(this.game.best, this.game.score);
                        localStorage.setItem("best", this.game.best);
                        this.game.changeState(this.game.scoreState);
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

    exit: function() {
        this.canvas.stage.touchstart = null;
    }
});