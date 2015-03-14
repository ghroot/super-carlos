var BlockSpawningSystem = KOMP.System.extend({
    init: function(creator, canvas) {
        this.creator = creator;
        this.canvas = canvas;
    },
    addedToWorld: function() {
        this.countdown = 1;
    },
    update: function(time) {
        this.countdown -= time;
        if (this.countdown <= 0) {
            this.countdown = 1;
            this.world.addEntity(this.creator.createBlock(this.canvas.width / 2, 0, 0.2));
        }
    }
});
