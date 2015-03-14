var InputSystem = KOMP.System.extend({
    init: function(stage) {
        this.stage = stage;
    },

    addedToWorld: function() {
        this.nodeList = this.world.getNodeList('input');
        this.stage.touchstart = this.onTouch.bind(this);
    },

    removedFromWorld: function() {
        this.stage.touchstart = null;
    },

    onTouch: function(interactionData) {
        this.inputSinceLastUpdate = interactionData;
    },

    update: function(time) {
        var self = this;
        this.nodeList.nodes.forEach(function(node) {
            node.input.input = self.inputSinceLastUpdate;
        });
        this.inputSinceLastUpdate = null;
    }
});
