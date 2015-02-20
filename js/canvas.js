var canvas = {

    init: function(width, height) {
        this.width = width;
        this.height = height;
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        this.ctx = canvas.getContext("2d");
        document.body.appendChild(canvas);
    },

    animate: function(loop) {
        var rAF = (function() {
            return window.requestAnimationFrame    ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||

                    // probably excessive fallback
                function(cb, el) {
                    window.setTimeout(cb, 1000/60);
                }
        })();
        var self = this;
        var l = function() {
            loop();
            rAF(l, self.canvas);
        };
        rAF(l, this.canvas);
    }
};
