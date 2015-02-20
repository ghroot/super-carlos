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
                    sprite: s_medals.Gold,
                    gravity: 0.1,
                    velocity: 0
                });
            }
            else if (type == 1)
            {
                this._blocks.push({
                    x: 160,
                    y: 0,
                    sprite: s_medals.Silver,
                    gravity: 0.066,
                    velocity: 0
                });
            }
            else
            {
                this._blocks.push({
                    x: 160,
                    y: 0,
                    sprite: s_medals.Bronze,
                    gravity: 0.033,
                    velocity: 0
                });
            }
            this.nextCreateFrame = frames + 20 + Math.random() * 60;
        }
        for (var i = 0, len = this._blocks.length; i < len; i++) {
            var b = this._blocks[i];

            b.velocity += b.gravity;
            b.y += b.velocity;

            if (bird.y - b.y <= 14) {
                if (bird.velocity < 0) {
                    this._blocks.splice(i, 1);
                    i--;
                    len--;
                    bird.y = b.y;
                    bird.velocity = -bird.velocity / 4;
                    score++;
                } else {
                    currentstate = states.Score;
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
            b.sprite.draw(ctx, b.x - s_medals.Silver.width / 2, b.y - s_medals.Silver.height);
        }
    }
}