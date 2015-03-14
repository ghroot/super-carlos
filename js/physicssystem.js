var PhysicsSystem = KOMP.System.extend({
    init: function() {
    },
    addedToWorld: function() {
        this.nodeList = this.world.getNodeList('transform', 'physics');
    },
    update: function(time) {
        this.nodeList.nodes.forEach(function(node) {
            node.physics.velocity.y += node.physics.gravity;
            node.transform.x += node.physics.velocity.x;
            node.transform.y += node.physics.velocity.y;
        });
    }
});
