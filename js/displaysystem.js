var DisplaySystem = KOMP.System.extend({
    init: function(displayObjectContainer) {
        this.displayObjectContainer = displayObjectContainer;
    },
    addedToWorld: function() {
        this.nodeList = this.world.getNodeList('transform', 'display');
        this.nodeList.nodeAdded.add(this.onNodeAdded, this);
        this.nodeList.nodeRemoved.add(this.onNodeRemoved, this);
    },
    removedFromWorld: function() {
        this.nodeList.nodeAdded.remove(this.onNodeAdded);
        this.nodeList.nodeRemoved.remove(this.onNodeRemoved);
    },
    onNodeAdded: function(node) {
        this.displayObjectContainer.addChild(node.display.sprite);
    },
    onNodeRemoved: function(node) {
        this.displayObjectContainer.removeChild(node.display.sprite);
    },
    update: function(time) {
        this.nodeList.nodes.forEach(function(node) {
            node.display.sprite.x = node.transform.x;
            node.display.sprite.y = node.transform.y;
            node.display.sprite.rotation = node.transform.rotation;
        });
    }
});