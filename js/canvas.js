/**
 * Canvas class, meant to make life easier by abstracting out
 * rendering and animation code
 */
var canvas = {

    /**
     * Constructor
     *
     * @param  {number} width  width of the canvas
     * @param  {number} height height of the canvas
     */
    init: function(width, height) {
        // create and set dimension of internal canvas
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = this.canvas.getContext("2d");

        // append internal canvas to body of document
        document.body.appendChild(this.canvas);
    },

    /**
     * Wrapper around window.requestAnimationFrame (rAF)
     *
     * @param  {function} loop the function to animate
     */
    animate: function(loop) {
        // get available rAF version
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

        // actual loop
        var self = this;
        var l = function() {
            loop();
            rAF(l, self.canvas);
        };
        rAF(l, this.canvas);
    }
};