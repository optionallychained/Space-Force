import { Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { CircleCollider } from '../component/circleCollider.component';
import { Deadly } from '../component/deadly.component';
import { Gravity } from '../component/gravity.component';
import { Mass } from '../component/mass.component';
import { GravityField } from './gravityField.entity';

export class Planet extends Entity {

    // make a pair of Planet + GravityField (visual indicator) w/ GravityField of appropriate scale
    public static makePair(position: Vec2, scale: Vec2, deadly: boolean, mass: number, fieldRadius: number): [Planet, GravityField] {
        return [
            new Planet(position, scale, deadly, mass, fieldRadius),
            new GravityField(position, new Vec2(fieldRadius * 2, fieldRadius * 2))
        ];
    }

    constructor(position: Vec2, scale: Vec2, deadly: boolean, mass: number, fieldRadius: number) {
        super({
            tag: 'planet',
            components: [
                new Transform(position, scale),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.CIRCLE),
                new FlatColor(deadly ? Color.red() : Color.green()),
                new CircleCollider(),
                new Mass(mass),
                new Gravity(fieldRadius)
            ]
        });

        if (deadly) {
            this.addComponent(new Deadly());
        }
    }
}
