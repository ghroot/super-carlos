var Creator = Class.extend({
    init: function(config) {
        this.config = config;
    },

    createBird: function(x, y) {
        var entity = new KOMP.Entity();

        var stateMachine = new KOMP.EntityStateMachine(entity);

        entity.addComponent(new InputComponent());
        entity.addComponent(new TransformComponent(x, y, 0));
        entity.addComponent(new StateComponent(stateMachine));

        var idleState = stateMachine.createState('idle');
        var birdSprite = PIXI.Sprite.fromFrame('bird_1');
        birdSprite.anchor.x = 0.5;
        birdSprite.anchor.y = 0.9;
        idleState.addComponent(new DisplayComponent(birdSprite));

        stateMachine.changeState('idle');

        return entity;
    }
});
