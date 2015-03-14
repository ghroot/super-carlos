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
        var idleBirdSprite = PIXI.Sprite.fromFrame('bird_2');
        idleBirdSprite.anchor.x = 0.5;
        idleBirdSprite.anchor.y = 0.9;
        idleState.addComponent(new DisplayComponent(idleBirdSprite));

        var jumpingState = stateMachine.createState('jumping');
        var physicsComponent = new PhysicsComponent(this.config.birdGravity);
        jumpingState.addComponent(physicsComponent);
        jumpingState.addComponent(new ScriptComponent(new SetVelocityScript(physicsComponent, {x: 0, y: -this.config.birdJumpSpeed})));
        var jumpingBirdSprite = PIXI.Sprite.fromFrame('bird_3');
        jumpingBirdSprite.anchor.x = 0.5;
        jumpingBirdSprite.anchor.y = 0.9;
        jumpingState.addComponent(new DisplayComponent(jumpingBirdSprite));

        stateMachine.changeState('idle');

        return entity;
    },

    createBlock: function(x, y, gravity) {
        var entity = new KOMP.Entity();

        var stateMachine = new KOMP.EntityStateMachine(entity);

        entity.addComponent(new TransformComponent(x, y, 0));
        entity.addComponent(new StateComponent(stateMachine));

        var fallingState = stateMachine.createState('falling');
        fallingState.addComponent(new PhysicsComponent(gravity));
        var blockSprite = PIXI.Sprite.fromFrame('block_bronze');
        blockSprite.anchor.x = 0.5;
        blockSprite.anchor.y = 0.5;
        fallingState.addComponent(new DisplayComponent(blockSprite));

        stateMachine.changeState('falling');

        return entity;
    }
});
