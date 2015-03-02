var Canvas = Class.extend({

    init: function(width, height, color) {
        this.canvas = document.createElement(navigator.isCocoonJS ? 'screencanvas' : 'canvas');
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

        this.stage = new PIXI.Stage(color);
        this.renderer = new PIXI.CanvasRenderer(width, height, {view: this.canvas, clearBeforeRender: false});
    },

    animate: function(loop) {
        var requestAnimationFrame = (function() {
            return window.requestAnimationFrame    ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||

                function(cb, el) {
                    window.setTimeout(cb, 1000 / 60);
                };
        })();
        var self = this;
        var l = function() {
            self.renderer.render(self.stage);
            loop();
            requestAnimationFrame(l, self.canvas);
        };
        requestAnimationFrame(l, this.canvas);
    }
});
