var BirdWithBlockCollisionHandler = Class.extend({
    init: function(world, session) {
        this.world = world;
        this.session = session;
        this.type1 = 'bird';
        this.type2 = 'block';
    },
    handleCollision: function(node1, node2) {
        if (node1.physics.velocity.y < 0) {
            node1.transform.y = node2.transform.y + node2.collision.y + node2.collision.height - node1.collision.y;
            node1.state.stateMachine.changeState('bash');
            this.world.removeEntity(node2.entity);
        } else {
            node2.transform.y = node1.transform.y + node1.collision.y - (node2.collision.height + node2.collision.y);
            this.session.gameOver = true;
        }
    }
});
