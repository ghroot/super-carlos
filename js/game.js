var
    groundY = 0,

    frames = 0,
    score = 0,
    best = localStorage.getItem("best") || 0,

// State vars //

    states = {
        Splash: 0, Game: 1, Score: 2
    },

// Game objects //

    /**
     * Ok button initiated in main()
     */
    okbtn;

/**
 * Game class, manages, update and render states
 */
var game = {

    state: 0,

    run: function() {
        var self = this;
        canvas.animate(function() {
            self.update();
            self.render(canvas.ctx);
        });
    },

    init: function() {

        var width = window.innerWidth;
        var height = window.innerHeight;
        var evt = "touchstart";
        if (width >= 500) {
            width  = 320;
            height = 480;
            evt = "mousedown";
        }
        document.addEventListener(evt, this.onPress);

        canvas.init(width, height);

        this.state = states.Splash;

        // initate graphics and okbtn
        var self = this;
        var img = new Image();
        img.onload = function() {
            initSprites(this);
            canvas.ctx.fillStyle = s_bg.color;

            groundY = height - s_fg.height-10;

            okbtn = {
                x: (canvas.width - s_buttons.Ok.width)/2,
                y: height - 200,
                width: s_buttons.Ok.width,
                height: s_buttons.Ok.height
            };

            self.run();
        };
        img.src = "resources/sheet.png";
    },

    onPress: function(evt) {

        switch (game.state) {

            // change state and update bird velocity
            case states.Splash:
                game.state = states.Game;
                break;

            // update bird velocity
            case states.Game:
                if (bird.onGround) {
                    bird.jump();
                }
                break;
            // change state if event within okbtn bounding box
            case states.Score:
                // get event position
                var mx = evt.offsetX, my = evt.offsetY;

                if (mx == null || my == null) {
                    mx = evt.touches[0].clientX;
                    my = evt.touches[0].clientY;
                }

                // check if within
                if (okbtn.x < mx && mx < okbtn.x + okbtn.width &&
                    okbtn.y < my && my < okbtn.y + okbtn.height
                ) {
                    blocks.reset();
                    game.state = states.Splash;
                    score = 0;
                }
                break;
        }
    },

    update: function() {
        frames++;

        if (this.state === states.Score) {
            // set best score to maximum score
            best = Math.max(best, score);
            localStorage.setItem("best", best);
        }
        if (this.state === states.Game) {
            blocks.update();
        }

        bird.update();
    },

    render: function(ctx) {
        // draw background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // draw background sprites
        s_bg.draw(ctx, 0, canvas.height - s_bg.height);
        s_bg.draw(ctx, s_bg.width, canvas.height - s_bg.height);

        blocks.draw(ctx);
        bird.draw(ctx);

        // draw forground sprites
        s_fg.draw(ctx, 0, canvas.height - s_fg.height);
        s_fg.draw(ctx, s_fg.width, canvas.height - s_fg.height);

        var width2 = canvas.width/2; // center of canvas

        if (this.state === states.Splash) {
            // draw splash text and sprite to canvas
            s_splash.draw(ctx, width2 - s_splash.width/2, canvas.height - 300);
            s_text.GetReady.draw(ctx, width2 - s_text.GetReady.width/2, canvas.height-380);

        }
        if (this.state === states.Score) {
            // draw gameover text and score board
            s_text.GameOver.draw(ctx, width2 - s_text.GameOver.width/2, canvas.height - 400);
            s_score.draw(ctx, width2 - s_score.width/2, canvas.height - 340);
            s_buttons.Ok.draw(ctx, okbtn.x, okbtn.y);
            // draw score and best inside the score board
            s_numberS.draw(ctx, width2-47, canvas.height-304, score, null, 10);
            s_numberS.draw(ctx, width2-47, canvas.height-262, best, null, 10);

        } else {
            // draw score to top of canvas
            s_numberB.draw(ctx, null, 20, score, width2);

        }
    }
};
