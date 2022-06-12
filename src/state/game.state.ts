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

        loadLevel(game, 6);
    },
    end: (game) => {
        game.removeSystems('Physics', 'Collision');
        game.world.clearEntities();
        game.text.clearEntities();
    },
    tick: (game) => {
        game.text.clearEntities();

        const player = game.world.filterEntitiesByTag('player')[0] as Player | undefined;
        const fuel = player?.getComponent<Fuel>('Fuel').value ?? -1;

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
        game.text.addString(
            'Fuel',
            new Vec2(-3 * 0.5 * 25, -game.world.dimensions.y / 2 + 25 + 35),
            new Vec2(25, 25),
            Color.white()
        );

        if (!fuel) {
            game.text.addString(
                'restart:[R]',
                new Vec2(-10 * 0.5 * 25, -game.world.dimensions.y / 2 + 25),
                new Vec2(25, 25),
                Color.yellow()
            )
        }

        if (game.getData<boolean>('displayLevelText')) {
            const title = game.getData<LevelText>('levelTitle');
            const desc = game.getData<LevelText>('levelDescription');

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
                Color.yellow()
            );
        }
    }
});
