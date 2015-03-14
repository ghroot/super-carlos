var ScriptSystem = KOMP.System.extend({
    init: function() {
    },
    addedToWorld: function() {
        this.nodeList = this.world.getNodeList('script');
        this.nodeList.nodeAdded.add(this.onNodeAdded, this);
        this.nodeList.nodeRemoved.add(this.onNodeRemoved, this);
    },
    removedFromWorld: function() {
        this.nodeList.nodeAdded.remove(this.onNodeAdded);
        this.nodeList.nodeRemoved.remove(this.onNodeRemoved);
    },
    onNodeAdded: function(node) {
        this.startScripts(node);
    },
    onNodeRemoved: function(node) {
        this.endScripts(node);
    },
    update: function(time) {
        var self = this;
        this.nodeList.nodes.forEach(function(node) {
            self.updateScripts(node, time);
        });
    },
    startScripts: function(node) {
        node.script.scripts.forEach(function(script) {
            script.start();
        });
    },
    updateScripts: function(node, time) {
        node.script.scripts.forEach(function(script) {
            script.update(time);
        });
    },
    endScripts: function(node) {
        node.script.scripts.forEach(function(script) {
            script.end();
        });
    }
});