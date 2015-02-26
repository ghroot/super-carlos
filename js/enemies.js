var Enemies = Class.extend({
    canvas: null,
    frames: 0,
    enemies: null,
    nextCreateFrame: 0,

    init: function(canvas, enemyX, enemyY) {
        this.canvas = canvas;
        this.enemyX = enemyX;
        this.enemyY = enemyY;
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
            this.enemies[i].update();
        }
        this.frames++;
        if (this.frames >= this.nextCreateFrame) {
            var sprite = PIXI.Sprite.fromFrame("block_platinum");
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            var enemy = new Enemy(this.enemyX, this.enemyY, sprite, -1.8, -0.1);
            this.enemies.push(enemy);
            this.canvas.stage.addChild(enemy.sprite);
            this.nextCreateFrame = this.frames + 100 + Math.random() * 100;
        }
    }
});