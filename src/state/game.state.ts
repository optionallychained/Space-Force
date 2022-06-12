import { Color, Keys, State, Transform, Vec2 } from 'aura-2d';
import { Fuel } from '../component/fuel.component';
import { Particle } from '../entity/particle.entity';
import { Planet } from '../entity/planet.entity';
import { Player } from '../entity/player.entity';
import { CircleCollision } from '../system/circleCollision.system';
import { Physics } from '../system/physics.system';

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        game.addSystems(Physics, CircleCollision);

        game.world.addEntities(
            ...Planet.makePair(new Vec2(0, -100), new Vec2(100, 100), Color.red(), 1000, 200),
            new Player()
        );
    },
    end: (game) => { },
    tick: (game) => {
        const player = game.world.filterEntitiesByTag('player')[0] as Player | undefined;

        if (player) {
            const transform = player.getComponent<Transform>('Transform');

            // death conditions
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

            if (game.input.isKeyDown(Keys.A)) {
                player.rotate(-1);
            }
            else if (game.input.isKeyDown(Keys.D)) {
                player.rotate(1);
            }

            if (game.input.isKeyDown(Keys.W)) {
                player.thrustOn();

                // spit particles out the back of the player
                const particlePosition = Vec2.sub(transform.position, Vec2.scale(transform.up, transform.scale.y / 2 + 5));
                game.world.addEntity(new Particle(particlePosition, transform.angle));
            }
            else {
                player.thrustOff();
            }

            game.text.clearEntities();
            game.text.addString(
                `Fuel: ${player.getComponent<Fuel>('Fuel').value}`,
                new Vec2(0, 200),
                new Vec2(30, 30),
                Color.white()
            );
        }
    }
});
