import { Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { CircleCollider } from '../component/circleCollider.component';
import { Gravity } from '../component/gravity.component';
import { Mass } from '../component/mass.component';
import { GravityField } from './gravityField.entity';

export class Planet extends Entity {

    // make a pair of Planet + GravityField (visual indicator) w/ GravityField of appropriate scale
    public static makePair(position: Vec2, scale: Vec2, color: Color, mass = 1, fieldRadius = 1): [Planet, GravityField] {
        return [
            new Planet(position, scale, color, mass, fieldRadius),
            new GravityField(position, new Vec2(fieldRadius * 2, fieldRadius * 2))
        ];
    }

    constructor(position: Vec2, scale: Vec2, color: Color, mass = 1, fieldRadius = 1) {
        super({
            tag: 'planet',
            components: [
                new Transform(position, scale),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.CIRCLE),
                new FlatColor(color),
                new CircleCollider(),
                new Mass(mass),
                new Gravity(fieldRadius)
            ]
        });
    }
}
