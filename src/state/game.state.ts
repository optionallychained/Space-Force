import { Angle, Color, Keys, State, Transform, Vec2 } from 'aura-2d';
import { Thrust } from '../component/thrust.component';
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
            ...Planet.makePair(new Vec2(0, -100), new Vec2(100, 100), Color.red(), 1000, 100),
            new Player()
        );
    },
    end: (game) => { },
    tick: (game) => {
        const player = game.world.filterEntitiesByTag('player')[0];

        if (player) {
            const transform = player.getComponent<Transform>('Transform');

            if (game.input.isKeyDown(Keys.A)) {
                transform.rotate(Angle.toRadians(-2));
            }
            else if (game.input.isKeyDown(Keys.D)) {
                transform.rotate(Angle.toRadians(2));
            }

            if (game.input.isKeyDown(Keys.W)) {
                (player as Player).thrustOn();

                // spit particles out the back of the player
                const particlePosition = Vec2.sub(transform.position, Vec2.scale(transform.up, transform.scale.y / 2 + 5));
                game.world.addEntity(new Particle(particlePosition, transform.angle));
            }
            else {
                (player as Player).thrustOff();
            }
        }
    }
});
