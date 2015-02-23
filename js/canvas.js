var Canvas = Class.extend({

    init: function(width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        var scale = window.innerWidth / width;
        var canvasStyleWidth = window.innerWidth;
        var canvasStyleHeight = (window.innerHeight * scale);
        this.scale = scale;
        this.canvas.style.width = canvasStyleWidth + "px";
        this.canvas.style.height = canvasStyleHeight + "px";
        this.width = window.innerWidth / scale;
        this.height = window.innerHeight / scale;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        console.log("Screen size: " + window.innerWidth + " x " + window.innerHeight);
        console.log("Scale: " + scale);
        console.log("Scaled size: " + this.canvas.style.width + " x " + this.canvas.style.height);
        console.log("Game size: " + this.width + " x " + this.height);
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
