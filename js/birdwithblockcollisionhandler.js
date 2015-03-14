var BirdWithBlockCollisionHandler = Class.extend({
    init: function(world) {
        this.world = world;
        this.type1 = 'bird';
        this.type2 = 'block';
    },
    handleCollision: function(node1, node2) {
        if (node1.physics.velocity.y < 0) {
            this.world.removeEntity(node2.entity);
        }
    }
});
