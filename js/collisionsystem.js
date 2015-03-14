var CollisionSystem = KOMP.System.extend({
    init: function(handlers) {
        this.handlers = handlers;
    },
    addedToWorld: function() {
        this.nodeList = this.world.getNodeList('transform', 'physics', 'collision', 'state');
    },
    update: function(time) {
        for (var i = 0; i < this.nodeList.nodes.length; i++) {
            for (var j = i + 1; j < this.nodeList.nodes.length; j++) {
                var node1 = this.nodeList.nodes[i];
                var node2 = this.nodeList.nodes[j];
                if (this.collides(node1, node2)) {
                    this.handlers.forEach(function(handler) {
                        if (handler.type1 == node1.collision.type && handler.type2 == node2.collision.type) {
                            handler.handleCollision(node1, node2);
                        } else if (handler.type2 == node1.collision.type && handler.type1 == node2.collision.type) {
                            handler.handleCollision(node2, node1);
                        }
                    });
                }
            }
        }
    },
    collides: function(node1, node2) {
        var r1left = node1.transform.x + node1.collision.x;
        var r1right = r1left + node1.collision.width;
        var r1top = node1.transform.y + node1.collision.y;
        var r1bottom = r1top + node1.collision.height;
        var r2left = node2.transform.x + node2.collision.x;
        var r2right = r2left + node2.collision.width;
        var r2top = node2.transform.y + node2.collision.y;
        var r2bottom = r2top + node2.collision.height;
        return !(r2left > r1right ||
            r2right < r1left ||
            r2top > r1bottom ||
            r2bottom < r1top);
    }
});
