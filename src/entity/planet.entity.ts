import { Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { CircleCollider } from '../component/circleCollider.component';
import { Deadly } from '../component/deadly.component';
import { Gravity } from '../component/gravity.component';
import { Mass } from '../component/mass.component';
import { Point } from '../component/point.component';
import { GravityField } from './gravityField.entity';

export type PlanetType = 'start' | 'deadly' | 'target' | 'musttouch';

export class Planet extends Entity {

    // make a pair of Planet + GravityField (visual indicator) w/ GravityField of appropriate scale
    public static makePair(position: Vec2, size: number, mass: number, fieldRadius: number, type: PlanetType): [Planet, GravityField] {
        return [
            new Planet(position, size, mass, fieldRadius, type),
            new GravityField(position, new Vec2(fieldRadius * 2, fieldRadius * 2))
        ];
    }

    constructor(position: Vec2, size: number, mass: number, fieldRadius: number, type: PlanetType) {
        super({
            tag: 'planet',
            components: [
                new Transform(position, new Vec2(size, size)),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.CIRCLE),
                new CircleCollider(),
                new Mass(mass),
                new Gravity(fieldRadius)
            ]
        });

        switch (type) {
            case 'start':
                this.addComponent(new FlatColor(Color.yellow()));
                break;

            case 'target':
                this.addComponents(new FlatColor(Color.green()), new Point());
                break;

            case 'musttouch':
                this.addComponents(new FlatColor(Color.blue()), new Point());
                break;

            case 'deadly':
                this.addComponents(new FlatColor(Color.red()), new Deadly());
                break;
        }
    }
}
