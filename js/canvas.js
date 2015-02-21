var Canvas = Class.extend({

    init: function(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    },

    animate: function(loop) {
        var rAF = (function() {
            return window.requestAnimationFrame    ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||

                function(cb, el) {
                    window.setTimeout(cb, 1000 / 60);
                }
        })();
        var self = this;
        var l = function() {
            loop();
            rAF(l, self.canvas);
        };
        rAF(l, this.canvas);
    }
});
