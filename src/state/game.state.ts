import { Color, Keys, State, Transform, Vec2 } from 'aura-2d';
import { Fuel } from '../component/fuel.component';
import { Particle } from '../entity/particle.entity';
import { Player } from '../entity/player.entity';
import { loadLevel } from '../levels/levels';
import { CircleCollision } from '../system/circleCollision.system';
import { Physics } from '../system/physics.system';

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        game.addSystems(Physics, CircleCollision);

        loadLevel(game, 0);
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

            // win condition
            if (game.getData<number>('points') >= game.getData<number>('requiredPoints')) {
                game.switchToState('win');
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
            const title = game.getData<string>('levelTitle');
            const desc = game.getData<string>('levelDescription');

            game.text.addString(
                title,
                new Vec2(-(title.length - 1) * 0.5 * 50, game.world.dimensions.y / 2 - 50),
                new Vec2(50, 50),
                Color.cyan()
            );

            game.text.addString(
                desc,
                new Vec2(-(desc.length - 1) * 0.5 * 30, game.world.dimensions.y / 2 - 120),
                new Vec2(30, 30),
                Color.yellow()
            );
        }
    }
});
