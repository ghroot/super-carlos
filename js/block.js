var Block = Class.extend({
    x: 0,
    y: 0,
    enabled: true,
    sprite: null,
    rotation: 0,
    rotationSpeed: 0,
    gravity: 0,
    velocityX: 0,
    velocityY: 0,

    init: function(x, y, sprite, gravity, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
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
