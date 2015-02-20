var bird = {

    x: 160,
    y: 0,

    frame: 0,
    velocity: 0,
    animation: [0, 1, 2, 1], // animation sequence

    rotation: 0,
    radius: 12,

    onGround: true,
    gravity: 2,
    jumpSpeed: 32,

    /**
     * Makes the bird "flap" and jump
     */
    jump: function() {
        this.velocity = -this.jumpSpeed;
        this.onGround = false;
    },

    /**
     * Update sprite animation and position of bird
     */
    update: function() {
        if (currentstate === states.Splash) {
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

    /**
     * Draws bird with rotation to canvas ctx
     *
     * @param  {CanvasRenderingContext2D} ctx the context used for
     *                                        drawing
     */
    draw: function(ctx) {
        ctx.save();
        // translate and rotate ctx coordinatesystem
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        var n = this.animation[this.frame];
        // draws the bird with center in origo
        s_bird[n].draw(ctx, -s_bird[n].width/2, -s_bird[n].height/2);

        ctx.restore();
    }
}