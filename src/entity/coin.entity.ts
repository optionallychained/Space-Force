import { Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Coin extends Entity {

    constructor(position: Vec2) {
        super({
            tag: 'coin',
            components: [
                new Transform(position, new Vec2(30, 30)),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.CIRCLE),
                new FlatColor(Color.yellow())
            ]
        });
    }
}
