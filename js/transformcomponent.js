var TransformComponent = KOMP.Component.extend({
    name: 'transform',
    init: function(x, y, rotation) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }
});