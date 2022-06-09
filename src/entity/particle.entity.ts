import { Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Particle extends Entity {

    constructor(position: Vec2) {
        super({
            tag: 'particle',
            components: [
                new Transform(position, new Vec2(20, 20)),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.SQUARE),
                new FlatColor(Color.red())
            ]
        });
    }
}
