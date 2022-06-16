import { Angle, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { CircleCollider } from '../component/circleCollider.component';
import { Fuel } from '../component/fuel.component';
import { Mass } from '../component/mass.component';
import { Frozen } from '../component/frozen.component';
import { Thrust } from '../component/thrust.component';
import { Planet } from './planet.entity';

export class Player extends Entity {

    constructor(position: Vec2, fuel: number) {
        super({
            tag: 'player',
            components: [
                new Transform(position, new Vec2(25, 30)),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.TRIANGLE),
                new FlatColor(Color.white()),
                new CircleCollider(),
                new Mass(15),
                new Fuel(fuel),
                new Thrust(65)
            ]
        });
    }

    public onCollisionStart(game: Game, other: Entity): void {
        if (other.tag === 'planet') {
            // "land" on the planet
            const transform = this.getComponent<Transform>('Transform');
            const planetTransform = other.getComponent<Transform>('Transform');
            const direction = Vec2.normalize(Vec2.sub(transform.position, planetTransform.position));

            transform.rotate(-transform.angle + Vec2.angleBetween(direction, new Vec2(0, 1)) * (direction.x < 0 ? -1 : 1));
            transform.velocity.set(0, 0);
            this.addComponent(new Frozen());

            // provide enough launch thrust to overcome the planet's gravity
            this.getComponent<Thrust>('Thrust').impulseThrust = other.getComponent<Mass>('Mass').value;

            // win
            if ((other as Planet).type === 'target' && game.getData<number>('points') >= game.getData<number>('requiredPoints')) {
                const fuel = this.getComponent<Fuel>('Fuel');
                game.setData('fuelRemaining', (fuel.value / fuel.initialValue * 100).toFixed(2))
                game.switchToState('win');
            }
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

    public thrustOn(): void {
        const fuel = this.getComponent<Fuel>('Fuel');
        fuel.value = Math.max(fuel.value -= 0.5, 0);

        if (fuel.value) {
            const thrust = this.getComponent<Thrust>('Thrust');

            if (this.hasComponent('Frozen')) {
                thrust.value = thrust.impulseThrust;
                this.removeComponent('Frozen');
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
        if (!this.hasComponent('Frozen')) {
            this.getComponent<Transform>('Transform').rotate(Angle.toRadians(2) * dir);
        }
    }
}
