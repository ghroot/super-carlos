var CountdownSystem = KOMP.System.extend({
    init: function() {
    },
    addedToWorld: function(world) {
        this.nodeList = world.getNodeList('countdown', 'state');
        this.nodeList.nodeAdded.add(this.onNodeAdded);
    },
    removedFromWorld: function(world) {
        this.nodeList.nodeAdded.remove(this.onNodeAdded);
    },
    onNodeAdded: function(node) {
        node.countdown.timeLeft = node.countdown.totalTime;
    },
    update: function(time) {
        this.nodeList.nodes.concat().forEach(function(node) {
            node.countdown.timeLeft -= time;
            if (node.countdown.timeLeft <= 0) {
                if (node.countdown.stateNameToChangeTo) {
                    node.state.stateMachine.changeState(node.countdown.stateNameToChangeTo);
                } else {
                    this.world.removeEntity(node.entity);
                }
            }
        });
    }
});
