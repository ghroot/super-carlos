var CountdownComponent = KOMP.Component.extend({
    name: 'countdown',
    init: function(time, stateNameToChangeTo) {
        this.totalTime = time;
        this.stateNameToChangeTo = stateNameToChangeTo;
    }
});
