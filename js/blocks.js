var Blocks = Class.extend({
    frames: 0,
    blocks: null,
    nextCreateFrame: 0,

    init: function(blockX) {
        this.blockX = blockX;
        this.blocks = [];
        this.nextCreateFrame = 10;
    },

    reset: function() {
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
                block = new Block(this.blockX, 0, sprites.block_bronze, 0.02, 0, 0.5);
            }
            else if (type == 1)
            {
                block = new Block(this.blockX, 0, sprites.block_silver, 0.08, 0, 1);
            }
            else
            {
                block = new Block(this.blockX, 0, sprites.block_gold, 0.16, 0, 2);
            }
            this.blocks.push(block);
            this.nextCreateFrame = this.frames + 30 + Math.random() * 30;
        }
    },

    draw: function(ctx) {
        for (var i = 0, len = this.blocks.length; i < len; i++) {
            var block = this.blocks[i];
            ctx.save();
            if (!block.enabled) {
                ctx.globalAlpha = 0.5;
            }
            ctx.translate(block.x, block.y);
            ctx.rotate(block.rotation * Math.PI/180);
            block.sprite.draw(ctx, -block.sprite.width / 2, -block.sprite.height);
            ctx.restore();
        }
    }
});