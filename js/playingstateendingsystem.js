var PlayingStateEndingSystem = KOMP.System.extend({
    init: function(stateMachine, session) {
        this.stateMachine = stateMachine;
        this.session = session;
    },
    update: function(time) {
        if (this.session.gameOver) {
            this.stateMachine.changeState('score');
        }
    }
});
