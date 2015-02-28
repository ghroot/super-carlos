var Bird = GameObject.extend({

    groundY: 0,
    velocity: 0,
    gravity: 0,
    jumpSpeed: 0,
    invincible: 0,

    init: function(x, groundY, gravity, jumpSpeed) {
        var birdMovieClip = PIXI.MovieClip.fromFrames(["bird_1", "bird_2", "bird_3"]);
        birdMovieClip.anchor.x = 0.5;
        birdMovieClip.anchor.y = 0.9;
        this._super(x, groundY, birdMovieClip);
        this.groundY = groundY;
        this.gravity = gravity;
        this.jumpSpeed = jumpSpeed;
    },

    reset: function() {
        this.y = this.groundY;
        this.invincible = 0;
    },

    jump: function() {
        if (this.velocity >= 0 && this.groundY - this.y <= 30) {
            this.y = this.groundY;
            this.velocity = -this.jumpSpeed;
        }
    },

    update: function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.velocity = 0;
        }
        if (this.invincible > 0) {
            this.invincible--;
        }
        if (this.velocity > 0) {
            this.sprite.gotoAndStop(0);
        } else if (this.velocity < 0) {
            this.sprite.gotoAndStop(2);
        } else {
            this.sprite.gotoAndStop(1);
        }
    }
});