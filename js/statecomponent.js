var StateComponent = KOMP.Component.extend({
    name: 'state',
    init: function(stateMachine) {
        this.stateMachine = stateMachine;
    }
});