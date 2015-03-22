var JumpControlSystem = KOMP.System.extend({
    init: function() {
    },
    addedToWorld: function() {
        this.nodeList = this.world.getNodeList('transform', 'state', 'input');
    },
    update: function(time) {
        this.nodeList.nodes.forEach(function(node) {
            if (node.input.input) {
                node.state.stateMachine.changeState('jumping');
            }
        });
    }
});
