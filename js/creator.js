var Creator = Class.extend({
    init: function(config, canvas) {
        this.config = config;
        this.canvas = canvas;
    },

    createGround: function(groundY) {
        var entity = new KOMP.Entity();
        entity.addComponent(new TransformComponent(0, groundY, 0));
        entity.addComponent(new PhysicsComponent(0));
        entity.addComponent(new CollisionComponent('ground', 0, 0, this.canvas.width, this.canvas.height - groundY));
        entity.addComponent(new StateComponent());
        return entity;
    },

    createBird: function() {
        var entity = new KOMP.Entity();

        var stateMachine = new KOMP.EntityStateMachine(entity);

        entity.addComponent(new InputComponent());
        entity.addComponent(new TransformComponent(this.canvas.width / 2, this.config.groundY + 2, 0));
        entity.addComponent(new CollisionComponent('bird', -8, -20, 16, 18));
        entity.addComponent(new StateComponent(stateMachine));

        var idleState = stateMachine.createState('idle');
        idleState.addComponent(new PhysicsComponent(0));
        var idleBirdSprite = PIXI.Sprite.fromFrame('bird_2');
        idleBirdSprite.anchor.x = 0.5;
        idleBirdSprite.anchor.y = 0.9;
        idleState.addComponent(new DisplayComponent(idleBirdSprite));

        var jumpingState = stateMachine.createState('jumping');
        var physicsComponent = new PhysicsComponent(this.config.birdGravity);
        jumpingState.addComponent(physicsComponent);
        jumpingState.addComponent(new ScriptComponent(
            new SetVelocityScript(physicsComponent, {x: 0, y: -this.config.birdJumpSpeed})));
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
        entity.addComponent(new CollisionComponent('block', -20, -20, 40, 40));
        entity.addComponent(new StateComponent(stateMachine));

        var blockSprite = PIXI.Sprite.fromFrame('block_bronze');
        blockSprite.anchor.x = 0.5;
        blockSprite.anchor.y = 0.5;
        entity.addComponent(new DisplayComponent(blockSprite));

        var fallingState = stateMachine.createState('falling');
        fallingState.addComponent(new PhysicsComponent(gravity));

        stateMachine.changeState('falling');

        return entity;
    }
});
