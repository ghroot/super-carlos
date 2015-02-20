var blocks = {
    _blocks: [],
    nextCreateFrame: 100,

    reset: function() {
        this._blocks = [];
    },

    update: function() {
        if (frames >= this.nextCreateFrame) {
            var type = Math.floor(Math.random() * 3);
            if (type == 0)
            {
                this._blocks.push({
                    x: 160,
                    y: 0,
                    enabled: true,
                    sprite: s_medals.Gold,
                    gravity: 0.1,
                    velocityX: 0,
                    velocityY: 0
                });
            }
            else if (type == 1)
            {
                this._blocks.push({
                    x: 160,
                    y: 0,
                    enabled: true,
                    sprite: s_medals.Silver,
                    gravity: 0.066,
                    velocityX: 0,
                    velocityY: 0
                });
            }
            else
            {
                this._blocks.push({
                    x: 160,
                    y: 0,
                    enabled: true,
                    sprite: s_medals.Bronze,
                    gravity: 0.033,
                    velocityX: 0,
                    velocityY: 0
                });
            }
            this.nextCreateFrame = frames + 20 + Math.random() * 60;
        }
        for (var i = 0, len = this._blocks.length; i < len; i++) {
            var b = this._blocks[i];

            b.velocityY += b.gravity;
            b.x += b.velocityX;
            b.y += b.velocityY;

            if (bird.y - b.y <= 14) {
                if (b.enabled) {
                    if (bird.velocity < 0) {
                        b.enabled = false;
                        b.gravity = 2;
                        if (Math.random() <= 0.5) {
                            b.velocityX = 4 + Math.random() * 2;
                        } else {
                            b.velocityX = -4 - Math.random() * 2;
                        }
                        b.velocityY = bird.velocity;
                        bird.y = b.y;
                        bird.velocity = -bird.velocity / 4;
                        score++;
                    } else {
                        game.state = states.Score;
                    }
                }
            } else if (b.y < -100) {
                this._blocks.splice(i, 1);
                i--;
                len--;
            }
        }
    },

    draw: function(ctx) {
        for (var i = 0, len = this._blocks.length; i < len; i++) {
            var b = this._blocks[i];
            if (!b.enabled) {
                canvas.ctx.globalAlpha = 0.5;
            }
            b.sprite.draw(ctx, b.x - s_medals.Silver.width / 2, b.y - s_medals.Silver.height);
            canvas.ctx.globalAlpha = 1;
        }
    }
};