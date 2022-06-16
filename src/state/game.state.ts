import { Color, Keys, State, Transform, Vec2 } from 'aura-2d';
import { Fuel } from '../component/fuel.component';
import { Particle } from '../entity/particle.entity';
import { Player } from '../entity/player.entity';
import { LevelText, loadLevel } from '../levels/levels';
import { CircleCollision } from '../system/circleCollision.system';
import { Physics } from '../system/physics.system';

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        game.addSystems(Physics, CircleCollision);

        loadLevel(game, game.getData<number>('level'));
    },
    end: (game) => {
        game.removeSystems('Physics', 'Collision');
        game.world.clearEntities();
        game.text.clearEntities();
        game.ui.clearEntities();
    },
    tick: (game) => {
        game.text.clearEntities();
        game.ui.clearEntities();

        const player = game.world.filterEntitiesByTag('player')[0] as Player | undefined;
        const { value: fuel, initialValue: initialFuel } = player?.getComponent<Fuel>('Fuel') ?? { value: -1, initialValue: -1 };

        if (player) {
            const transform = player.getComponent<Transform>('Transform');

            // rotation
            if (game.input.isKeyDown(Keys.A)) {
                player.rotate(-1);
            }
            else if (game.input.isKeyDown(Keys.D)) {
                player.rotate(1);
            }

            // thrust
            if (game.input.isKeyDown(Keys.W)) {
                player.thrustOn();

                if (fuel) {
                    // spit particles out the back of the player
                    const particlePosition = Vec2.sub(transform.position, Vec2.scale(transform.up, transform.scale.y / 2 + 5));
                    game.world.addEntity(new Particle(particlePosition, transform.angle));
                }

                game.setData('displayLevelText', false);
            }
            else {
                player.thrustOff();
            }

            // death condition
            if (
                transform.position.x - transform.scale.x / 2 >= game.world.dimensions.x / 2
                ||
                transform.position.x + transform.scale.x / 2 <= -game.world.dimensions.x / 2
                ||
                transform.position.y - transform.scale.y / 2 >= game.world.dimensions.y / 2
                ||
                transform.position.y + transform.scale.y / 2 <= -game.world.dimensions.y / 2
            ) {
                game.switchToState('dead');
            }
        }

        // reset
        if (game.input.isKeyDown(Keys.R)) {
            // interesting circular state switch...
            game.switchToState('game');
        }

        // info readouts
        game.ui.addPanel(
            new Vec2(0, -game.world.dimensions.y / 2 + 35 + 10),
            new Vec2(game.world.dimensions.x, 80),
            Color.grey(0.2)
        );

        game.ui.addPanel(
            new Vec2(0, -game.world.dimensions.y / 2 + 25),
            new Vec2((game.world.dimensions.x - 25) * fuel / initialFuel, 25),
            Color.yellow()
        );

        game.text.addString(
            '[W]:thrust',
            new Vec2(-game.world.dimensions.x / 2 + 20, -game.world.dimensions.y / 2 + 25 + 35),
            new Vec2(25, 25),
            Color.white()
        );

        game.text.addString(
            '[A/D]:rotate',
            new Vec2(game.world.dimensions.x / 2 - (12 * 25), -game.world.dimensions.y / 2 + 25 + 35),
            new Vec2(25, 25),
            Color.white()
        );

        game.text.addString(
            '[R]:reset',
            new Vec2(-8 * 0.5 * 25, -game.world.dimensions.y / 2 + 25 + 35),
            new Vec2(25, 25),
            Color.white()
        )

        if (!fuel) {
            game.text.addString(
                'out of fuel!',
                new Vec2(-11 * 0.5 * 25, -game.world.dimensions.y / 2 + 25),
                new Vec2(25, 25),
                Color.red()
            );
        }

        if (game.getData<boolean>('displayLevelText')) {
            const title = game.getData<LevelText>('levelTitle');
            const desc = game.getData<LevelText>('levelDescription');

            game.ui.addPanel(
                new Vec2(0, game.world.dimensions.y / 2 - title.fontSize),
                new Vec2(game.world.dimensions.x, title.fontSize * 2.5 + desc.fontSize * 2),
                Color.grey(0.2)
            );

            game.text.addString(
                title.text,
                new Vec2(-(title.text.length - 1) * 0.5 * title.fontSize, game.world.dimensions.y / 2 - title.fontSize),
                new Vec2(title.fontSize, title.fontSize),
                Color.cyan()
            );

            game.text.addString(
                desc.text,
                new Vec2(-(desc.text.length - 1) * 0.5 * desc.fontSize, game.world.dimensions.y / 2 - title.fontSize - desc.fontSize - 35),
                new Vec2(desc.fontSize, desc.fontSize),
                Color.rgba(255, 0, 255)
            );
        }
    }
});
