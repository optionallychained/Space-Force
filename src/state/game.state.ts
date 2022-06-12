import { Color, Keys, State, Transform, Vec2 } from 'aura-2d';
import { Fuel } from '../component/fuel.component';
import { FuelBar } from '../entity/fuelBar.entity';
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
            ...Planet.makePair(new Vec2(200, -100), new Vec2(100, 100), true, 2000, 300),
            ...Planet.makePair(new Vec2(-200, -100), new Vec2(100, 100), false, 1000, 300),
            new FuelBar(new Vec2(0, -game.world.dimensions.y / 2 + 25), game.world.dimensions.x - 50),
            new Player(),
        );
    },
    end: (game) => { },
    tick: (game) => {
        game.text.clearEntities();

        const player = game.world.filterEntitiesByTag('player')[0] as Player | undefined;

        if (player) {
            const transform = player.getComponent<Transform>('Transform');
            const fuel = player.getComponent<Fuel>('Fuel').value;

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

                if (fuel) {
                    // spit particles out the back of the player
                    const particlePosition = Vec2.sub(transform.position, Vec2.scale(transform.up, transform.scale.y / 2 + 5));
                    game.world.addEntity(new Particle(particlePosition, transform.angle));
                }
            }
            else {
                player.thrustOff();
            }

            if (!fuel) {
                game.text.addString(
                    'restart:[R]',
                    new Vec2(-10 * 0.5 * 25, -game.world.dimensions.y / 2 + 25),
                    new Vec2(25, 25),
                    Color.yellow()
                )
            }
        }


        game.text.addString(
            'Fuel',
            new Vec2(-3 * 0.5 * 25, -game.world.dimensions.y / 2 + 25 + 35),
            new Vec2(25, 25),
            Color.white()
        );
    }
});
