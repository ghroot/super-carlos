var Bird = Class.extend({
    x: 0,
    y: 0,
    groundY: 0,
    frame: 0,
    velocity: 0,
    onGround: true,
    gravity: 2,
    jumpSpeed: 32,

    init: function(x, groundY) {
        this.x = x;
        this.groundY = groundY;
    },

    jump: function() {
        this.velocity = -this.jumpSpeed;
        this.onGround = false;
    },

    update: function() {
        if (game.state === States.Splash) {
            this.y = this.groundY;
            this.onGround = true;
        } else {
            this.velocity += this.gravity;
            this.y += this.velocity;

            if (this.y >= this.groundY) {
                this.y = this.groundY;
                this.onGround = true;
                this.velocity = 0;
            }

            if (this.velocity > 0) {
                this.frame = 0;
            } else if (this.velocity < 0) {
                this.frame = 2;
            } else {
                this.frame = 1;
            }
        }
    },

    draw: function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        s_bird[this.frame].draw(ctx, -s_bird[this.frame].width / 2, -s_bird[this.frame].height / 2);
        ctx.restore();
    }
});