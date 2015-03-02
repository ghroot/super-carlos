var Enemies = Class.extend({
    canvas: null,
    frames: 0,
    enemies: null,
    nextCreateFrame: 0,

    init: function(canvas, enemyX, enemyY, variables) {
        this.canvas = canvas;
        this.enemyX = enemyX;
        this.enemyY = enemyY;
        this.variables = variables;
        this.enemies = [];
        this.nextCreateFrame = 200;
    },

    reset: function() {
        for (var i = 0, len = this.enemies.length; i < len; i++) {
            this.canvas.stage.removeChild(this.enemies[i].sprite);
        }
        this.enemies = [];
        this.frames = 0;
        this.nextCreateFrame = 200;
    },

    update: function() {
        for (var i = 0, len = this.enemies.length; i < len; i++) {
            var enemy = this.enemies[i];
            enemy.update();
            if (enemy.y > this.canvas.height + 100 || enemy.x < 100) {
                this.canvas.stage.removeChild(enemy.sprite);
                this.enemies.splice(i, 1);
                i--;
                len--;
            }
        }
        this.frames++;
        if (this.frames >= this.nextCreateFrame) {
            var sprite = PIXI.Sprite.fromFrame("block_platinum");
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            var enemy = new Enemy(this.enemyX, this.enemyY, sprite, -(parseFloat(this.variables.enemySpeed) || 1.8), -0.1);
            this.enemies.push(enemy);
            this.canvas.stage.addChild(enemy.sprite);
            this.nextCreateFrame = this.frames + 100 + Math.random() * 100;
        }
    }
});
