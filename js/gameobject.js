var GameObject = Class.extend({

    x: 0,
    y: 0,
    rotation: 0,
    sprite: null,
    collisionArea: null,

    init: function(x, y, sprite, collisionArea) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.collisionArea = collisionArea;

        //if (this.collisionArea) {
        //    var shape = new PIXI.Graphics();
        //    shape.beginFill(0xff0000, 0.5);
        //    shape.drawCircle(this.collisionArea.x, this.collisionArea.y, this.collisionArea.radius);
        //    shape.endFill();
        //    this.sprite.addChild(shape);
        //}
    },

    updateSprite: function() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.rotation = this.rotation;
    },

    collidesWith: function(other) {
        var x1 = this.x + this.collisionArea.x;
        var y1 = this.y + this.collisionArea.y;
        var x2 = other.x + other.collisionArea.x;
        var y2 = other.y + other.collisionArea.y;
        var dx = x1 - x2;
        var dy = y1 - y2;
        dx *= dx;
        dy *= dy;
        var r = this.collisionArea.radius + other.collisionArea.radius;
        return dx + dy <= r * r;
    }
});
