var BirdWithGroundCollisionHandler = Class.extend({
    init: function() {
        this.type1 = 'bird';
        this.type2 = 'ground';
    },
    handleCollision: function(node1, node2) {
        node1.transform.y = node2.transform.y + node2.collision.y - node1.collision.y;
        node1.state.stateMachine.changeState('idle');
    }
});
