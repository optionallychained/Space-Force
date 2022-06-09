import { Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { CircleCollider } from '../component/circleCollider.component';

export class Player extends Entity {

    constructor() {
        super({
            tag: 'player',
            components: [
                new Transform(new Vec2(), new Vec2(30, 40)),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.TRIANGLE),
                new FlatColor(Color.white()),
                new CircleCollider()
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
        }
    }
}
