var CollisionDisplaySystem = KOMP.System.extend({
    init: function(displayObjectContainer) {
        this.displayObjectContainer = displayObjectContainer;
        this.entities = [];
        this.sprites = [];
    },
    addedToWorld: function() {
        this.nodeList = this.world.getNodeList('transform', 'collision');
        this.nodeList.nodeAdded.add(this.onNodeAdded, this);
        this.nodeList.nodeRemoved.add(this.onNodeRemoved, this);
    },
    removedFromWorld: function() {
        this.nodeList.nodeAdded.remove(this.onNodeAdded);
        this.nodeList.nodeRemoved.remove(this.onNodeRemoved);
    },
    onNodeAdded: function(node) {
        var sprite = new PIXI.Graphics();
        sprite.lineStyle(1, 0xff0000, 1);
        sprite.drawRect(node.collision.x, node.collision.y, node.collision.width, node.collision.height);
        this.entities.push(node.entity);
        this.sprites.push(sprite);
        this.displayObjectContainer.addChild(sprite);
    },
    onNodeRemoved: function(node) {
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            if (entity === node.entity) {
                var sprite = this.sprites[i];
                this.displayObjectContainer.removeChild(sprite);
                this.entities.splice(i, 1);
                this.sprites.splice(i, 1);
                break;
            }
        }
    },
    update: function(time) {
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            var sprite = this.sprites[i];
            var transform = entity.getComponent('transform');
            sprite.x = transform.x;
            sprite.y = transform.y;
        }
    }
});
