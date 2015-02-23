var Bird = Class.extend({
    x: 0,
    y: 0,
    groundY: 0,
    sprite: null,
    velocity: 0,
    onGround: true,
    gravity: 2,
    jumpSpeed: 30,

    init: function(x, groundY) {
        this.x = x;
        this.groundY = groundY;
        this.sprite = sprites.bird_2;
        this.y = this.groundY;
        this.onGround = true;
    },

    reset: function() {
        this.y = this.groundY;
        this.onGround = true;
    },

    jump: function() {
        this.velocity = -this.jumpSpeed;
        this.onGround = false;
    },

    update: function() {
        if (game.state === States.Game) {
            this.velocity += this.gravity;
            this.y += this.velocity;

            if (this.y >= this.groundY) {
                this.y = this.groundY;
                this.onGround = true;
                this.velocity = 0;
            }

            if (this.velocity > 0) {
                this.sprite = sprites.bird_1;
            } else if (this.velocity < 0) {
                this.sprite = sprites.bird_3;
            } else {
                this.sprite = sprites.bird_2;
            }
        }
    },

    draw: function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        this.sprite.draw(ctx, -this.sprite.width / 2, -this.sprite.height / 2);
        ctx.restore();
    }
});