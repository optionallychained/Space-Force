import { Angle, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { CircleCollider } from '../component/circleCollider.component';
import { Fuel } from '../component/fuel.component';
import { Mass } from '../component/mass.component';
import { Thrust } from '../component/thrust.component';

export class Player extends Entity {

    private landed = false;

    constructor(position: Vec2, fuel: number) {
        super({
            tag: 'player',
            components: [
                new Transform(position, new Vec2(25, 25)),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.TRIANGLE),
                new FlatColor(Color.white()),
                new CircleCollider(),
                new Mass(15),
                new Fuel(fuel),
                new Thrust(50)
            ]
        });
    }

    public onCollisionStart(game: Game, other: Entity): void {
        if (other.tag === 'planet') {
            // "land" on the planet
            const transform = this.getComponent<Transform>('Transform');
            const planetTransform = other.getComponent<Transform>('Transform');
            const direction = Vec2.normalize(Vec2.sub(transform.position, planetTransform.position));

            transform.rotate(Math.acos(Vec2.dot(transform.up, direction)));
            transform.velocity.set(0, 0);
            this.landed = true;

            // provide enough launch thrust to overcome the planet's gravity
            this.getComponent<Thrust>('Thrust').impulseThrust = other.getComponent<Mass>('Mass').value;
        }

        // progress
        if (other.hasComponent('Point')) {
            game.setData('points', game.getData<number>('points') + 1);
        }

        // death
        if (other.hasComponent('Deadly')) {
            game.switchToState('dead');
        }
    }

    public onCollisionContinue(game: Game, other: Entity): void {
        if (other.tag === 'planet') {
            // TODO doesn't work properly, since physics system applies velocity to position directly every tick
            const transform = this.getComponent<Transform>('Transform')
            transform.velocity.set(-transform.velocity.x, -transform.velocity.y);
        }
    }

    public onCollisionEnd(game: Game, other: Entity): void {
        if (other.tag === 'planet') {
            this.landed = false;
        }
    }

    public thrustOn(): void {
        const fuel = this.getComponent<Fuel>('Fuel');
        fuel.value = Math.max(fuel.value -= 0.5, 0);

        if (fuel.value) {
            const thrust = this.getComponent<Thrust>('Thrust');

            if (this.landed) {
                thrust.value = thrust.impulseThrust;
            }
            else {
                thrust.value = thrust.baseThrust;
            }
        }
    }

    public thrustOff(): void {
        this.getComponent<Thrust>('Thrust').value = 0;
    }

    public rotate(dir: 1 | -1): void {
        if (!this.landed) {
            this.getComponent<Transform>('Transform').rotate(Angle.toRadians(2) * dir);
        }
    }
}
