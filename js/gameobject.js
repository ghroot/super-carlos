var GameObject = Class.extend({
    x: 0,
    y: 0,
    rotation: 0,
    sprite: null,

    init: function(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    },

    updateSprite: function() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.rotation = this.rotation;
    }
});
