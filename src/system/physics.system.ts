import { Game, System, Transform, Vec2 } from 'aura-2d';
import { Gravity } from '../component/gravity.component';
import { Mass } from '../component/mass.component';
import { Thrust } from '../component/thrust.component';

// custom Physics system, implementing multi-source gravity-and-thrust-based acceleration
export class Physics extends System {

    constructor() {
        super('Physics');
    }

    public tick(game: Game, frameDelta: number): void {
        const movers = game.world.filterEntitiesByComponentNames('Transform', 'Mass', 'Thrust');
        const gravitySources = game.world.filterEntitiesByComponentNames('Transform', 'Mass', 'Gravity');

        // normal relative movement for particles
        // TODO might be cool to have particles also affected by gravity?
        for (const particle of game.world.filterEntitiesByTag('particle')) {
            const transform = particle.getComponent<Transform>('Transform');
            transform.move(Vec2.scale(transform.velocity, frameDelta / 1000));
        }

        // gravity-affected, accelerative, absolute movement for movers
        for (const mover of movers) {
            const moverTransform = mover.getComponent<Transform>('Transform');
            const moverMass = mover.getComponent<Mass>('Mass').value;

            // movers may be affected by multiple gravity sources at once; add up their forces before calculating the resultant acceleration
            const totalForce = new Vec2();
            for (const source of gravitySources) {
                const sourceTransform = source.getComponent<Transform>('Transform');
                const sourceMass = source.getComponent<Mass>('Mass').value;

                const distance = Vec2.distanceBetween(moverTransform.position, sourceTransform.position);

                // if the mover is inside the source gravity field, calculate the gravitational force on the mover and add it to totalForce
                if (Math.abs(distance) < source.getComponent<Gravity>('Gravity').fieldRadius) {
                    const gravitationalForce = Vec2.scale(
                        // force is applied in the direction mover -> source, "pulling" the mover towards the source
                        Vec2.normalize(Vec2.sub(sourceTransform.position, moverTransform.position)),
                        // gravitational force w/ arbitrary g === 0.25
                        0.25 * ((moverMass * sourceMass) / distance)
                    );

                    totalForce.set(totalForce.x + gravitationalForce.x, totalForce.y + gravitationalForce.y);
                }
            }

            // a = f / m
            const acceleration = Vec2.add(
                // total gravity affect
                Vec2.scale(totalForce, 1 / moverMass),
                // mover thrust affect (applied in mover's forward direction)
                Vec2.scale(moverTransform.up, 1 / moverMass * mover.getComponent<Thrust>('Thrust').value)
            );

            // apply acceleration and velocity
            moverTransform.velocity.set(moverTransform.velocity.x + acceleration.x, moverTransform.velocity.y + acceleration.y);
            moverTransform.position.set(
                moverTransform.position.x + (moverTransform.velocity.x * frameDelta / 1000),
                moverTransform.position.y + (moverTransform.velocity.y * frameDelta / 1000)
            );
        }
    }
}
