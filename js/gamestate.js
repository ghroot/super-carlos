var GameState = Class.extend({

    init: function(game) {
        this.game = game;
        this.canvas = game.canvas;
        this.variables = game.variables;
        this.bird = game.bird;
        this.blocks = game.blocks;
        this.enemies = game.enemies;
        this.scoreText = new PIXI.BitmapText("0", {font: "numbers_big"});
        this.scoreText.x = Math.floor((this.canvas.width - this.scoreText.textWidth) / 2);
        this.scoreText.y = 6;
    },

    onTouch: function(interactionData) {
        this.bird.jump();
    },

    enter: function() {
        this.canvas.stage.addChild(this.scoreText);
        this.canvas.stage.touchstart = this.onTouch.bind(this);
        this.bird.jump();
    },

    update: function() {
        this.blocks.update();
        this.enemies.update();
        this.bird.update();
        this.scoreText.setText(this.game.score.toString());
        this.scoreText.x = Math.floor((this.canvas.width - this.scoreText.textWidth) / 2);
        this.checkCollisions();
    },

    checkCollisions: function() {
        var collidedBlocks = [];
        for (var i = 0, len = this.blocks.blocks.length; i < len; i++) {
            var block = this.blocks.blocks[i];
            if (this.bird.collidesWith(block)) {
                collidedBlocks.push(block);
            }
        }
        for (i = 0, len = collidedBlocks.length; i < len; i++) {
            this.birdCollidedWithBlock(collidedBlocks[i]);
        }
        var collidedEnemies = [];
        for (i = 0, len = this.enemies.enemies.length; i < len; i++) {
            var enemy = this.enemies.enemies[i];
            if (this.bird.collidesWith(enemy)) {
                collidedEnemies.push(enemy);
            }
        }
        for (i = 0, len = collidedEnemies.length; i < len; i++) {
            this.birdCollidedWithEnemy(collidedEnemies[i]);
        }
    },

    birdCollidedWithBlock: function(block) {
        if (block.enabled) {
            if (this.bird.invincible > 0 || this.bird.velocity < 0) {
                block.enabled = false;
                block.sprite.alpha = 0.5;
                block.gravity = 2;
                if (Math.random() <= 0.5) {
                    block.velocityX = 4 + Math.random() * 2;
                    block.rotationSpeed = 0.5;
                } else {
                    block.velocityX = -4 - Math.random() * 2;
                    block.rotationSpeed = -0.5;
                }
                block.velocityY = -20;
                this.bird.velocity = -this.bird.velocity / 4;
                this.bird.invincible = 15;
                this.game.score++;
            } else {
                this.game.best = Math.max(this.game.best, this.game.score);
                localStorage.setItem("best", this.game.best);
                this.game.changeState(this.game.scoreState);
            }
        }
    },

    birdCollidedWithEnemy: function(enemy) {
        if (enemy.enabled) {
            if (this.bird.velocity > 0) {
                enemy.enabled = false;
                enemy.sprite.alpha = 0.5;
                enemy.gravity = 2;
                this.bird.velocity = -this.bird.bounceSpeed;
                this.game.score++;
            } else {
                this.game.best = Math.max(this.game.best, this.game.score);
                localStorage.setItem("best", this.game.best);
                this.game.changeState(this.game.scoreState);
            }
        }
    },

    exit: function() {
        this.canvas.stage.removeChild(this.scoreText);
        this.canvas.stage.touchstart = null;
    }
});
