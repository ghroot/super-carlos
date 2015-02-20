var bird = {

    x: 160,
    y: 0,
    frame: 0,
    velocity: 0,
    radius: 12,
    onGround: true,
    gravity: 2,
    jumpSpeed: 32,

    jump: function() {
        this.velocity = -this.jumpSpeed;
        this.onGround = false;
    },

    update: function() {
        if (game.state === states.Splash) {
            this.y = groundY;
            this.onGround = true;
        } else {
            this.velocity += this.gravity;
            this.y += this.velocity;

            if (this.y >= groundY) {
                this.y = groundY;
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
};