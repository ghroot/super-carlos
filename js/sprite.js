var sprites = {};

var Sprite = Class.extend({
    init: function(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    },

    draw: function(ctx, x, y) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
            x, y, this.width, this.height);
    }
});

function createSpritesFromAtlas(img, atlas) {
    for (var i = 0; i < atlas.frames.length; i++){
        var frame = atlas.frames[i];
        sprites[frame.filename] = new Sprite(img, frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h);
    }
}

function drawNumber(ctx, sprite, x, y, num, center, offset) {
    num = num.toString();

    var step = (sprite.width + 2) / 10;
    var width = step - 2;

    if (center) {
        x = center - (num.length * step - 2) / 2;
    }
    if (offset) {
        x += step * (offset - num.length);
    }

    for (var i = 0, len = num.length; i < len; i++) {
        var n = parseInt(num[i]);
        ctx.drawImage(sprite.img, sprite.x + step * n, sprite.y, width, sprite.height, x, y, width, sprite.height);
        x += step;
    }
}
