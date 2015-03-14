var ScriptComponent = Class.extend({
    name: 'script',
    init: function(/* scripts */) {
        this.scripts = [];
        for (var i = 0; i < arguments.length; i++) {
            this.scripts.push(arguments[i]);
        }
    }
});
