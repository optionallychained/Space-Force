import { Angle, Color, Keys, Physics, State, Transform, Vec2 } from 'aura-2d';
import { Particle } from '../entity/particle.entity';
import { Planet } from '../entity/planet.entity';
import { Player } from '../entity/player.entity';
import { CircleCollision } from '../system/circleCollision.system';

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        game.addSystems(Physics, CircleCollision);

        game.world.addEntities(new Player(), new Planet(new Vec2(0, -100), new Vec2(100, 100), Color.red()));
    },
    end: (game) => { },
    tick: (game) => {
        const transform = game.world.filterEntitiesByTag('player')[0]?.getComponent<Transform>('Transform');

        if (game.input.isKeyDown(Keys.A)) {
            transform.rotate(Angle.toRadians(-1));
        }
        else if (game.input.isKeyDown(Keys.D)) {
            transform.rotate(Angle.toRadians(1));
        }

        if (game.input.isKeyDown(Keys.W)) {
            transform.moveUp(1);

            // spit particles out the back of the player
            const particlePosition = Vec2.sub(transform.position, Vec2.scale(transform.up, transform.scale.y / 2 + 5));
            game.world.addEntity(new Particle(particlePosition, transform.angle));
        }
    }
});
