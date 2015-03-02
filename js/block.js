var Block = GameObject.extend({

    enabled: true,
    rotationSpeed: 0,
    gravity: 0,
    velocityX: 0,
    velocityY: 0,

    init: function(x, y, sprite, gravity, velocityX, velocityY) {
        this._super(x, y, sprite, new PIXI.Circle(0, 0, 20));
        this.gravity = gravity;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    },

    update: function() {
        this.velocityY += this.gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.rotation += this.rotationSpeed;
    }
});
