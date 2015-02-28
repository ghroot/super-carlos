var Blocks = Class.extend({
    canvas: null,
    frames: 0,
    blocks: null,
    nextCreateFrame: 0,

    init: function(canvas, variables) {
        this.canvas = canvas;
        this.variables = variables;
        this.blockX = canvas.width / 2;
        this.blocks = [];
        this.nextCreateFrame = 10;
    },

    reset: function() {
        for (var i = 0, len = this.blocks.length; i < len; i++) {
            this.canvas.stage.removeChild(this.blocks[i].sprite);
        }
        this.blocks = [];
        this.frames = 0;
        this.nextCreateFrame = 10;
    },

    update: function() {
        for (var i = 0, len = this.blocks.length; i < len; i++) {
            this.blocks[i].update();
        }
        this.frames++;
        if (this.frames >= this.nextCreateFrame) {
            var type = Math.floor(Math.random() * 3);
            var block;
            if (type === 0)
            {
                block = new Block(this.blockX, -20, PIXI.Sprite.fromFrame("block_bronze"), parseFloat(this.variables.bronzeBlockGravity) || 0.02, 0, parseFloat(this.variables.bronzeBlockStartSpeed) || 1);
            }
            else if (type === 1)
            {
                block = new Block(this.blockX, -20, PIXI.Sprite.fromFrame("block_silver"), parseFloat(this.variables.silverBlockGravity) || 0.04, 0, parseFloat(this.variables.silverBlockStartSpeed) || 2.8);
            }
            else
            {
                block = new Block(this.blockX, -20, PIXI.Sprite.fromFrame("block_gold"), parseFloat(this.variables.goldBlockGravity) || 0.07, 0, parseFloat(this.variables.goldBlockStartSpeed) || 4.7);
            }
            this.blocks.push(block);
            block.sprite.anchor.x = 0.5;
            block.sprite.anchor.y = 0.5;
            this.canvas.stage.addChildAt(block.sprite, 3);
            this.nextCreateFrame = this.frames + 30 + Math.random() * 30;
        }
    }
});