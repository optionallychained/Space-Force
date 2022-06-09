import { Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Planet extends Entity {

    constructor(position: Vec2, scale: Vec2, color: Color) {
        super({
            tag: 'planet',
            components: [
                new Transform(position, scale),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.CIRCLE),
                new FlatColor(color)
            ]
        });
    }
}
