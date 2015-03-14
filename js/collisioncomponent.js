var CollisionComponent = KOMP.Component.extend({
    name: 'collision',
    init: function(type, x, y, width, height) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
});
