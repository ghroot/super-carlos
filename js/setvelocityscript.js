var SetVelocityScript = Script.extend({
    init: function(physicsComponent, velocity) {
        this.physicsComponent = physicsComponent;
        this.velocity = velocity;
    },
    start: function() {
        this.physicsComponent.velocity.x = this.velocity.x;
        this.physicsComponent.velocity.y = this.velocity.y;
    }
});
