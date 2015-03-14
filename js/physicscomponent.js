var PhysicsComponent = KOMP.Component.extend({
    name: 'physics',
    init: function(gravity) {
        this.gravity = gravity;
        this.velocity = {x: 0, y: 0};
    }
});
