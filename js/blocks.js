var Blocks = Class.extend({
    frames: 0,
    blocks: null,
    nextCreateFrame: 0,

    init: function() {
        this.blocks = [];
        this.nextCreateFrame = 10;
    },

    update: function() {
        for (var i = 0, len = this.blocks.length; i < len; i++) {
            var block = this.blocks[i];
            block.update();
        }
        this.frames++;
        if (this.frames >= this.nextCreateFrame) {
            var type = Math.floor(Math.random() * 3);
            var block;
            if (type == 0)
            {
                block = new Block(160, 0, s_medals.Gold, 0.16, 0, 2);
            }
            else if (type == 1)
            {
                block = new Block(160, 0, s_medals.Silver, 0.08, 0, 1);
            }
            else
            {
                block = new Block(160, 0, s_medals.Bronze, 0.04, 0, 0.5);
            }
            this.blocks.push(block);
            this.nextCreateFrame = this.frames + 30 + Math.random() * 30;
        }
    },

    draw: function(ctx) {
        for (var i = 0, len = this.blocks.length; i < len; i++) {
            var block = this.blocks[i];
            if (!block.enabled) {
                ctx.globalAlpha = 0.5;
            }
            block.sprite.draw(ctx, block.x - s_medals.Silver.width / 2, block.y - s_medals.Silver.height);
            ctx.globalAlpha = 1;
        }
    }
});