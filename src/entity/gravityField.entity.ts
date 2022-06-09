import { Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class GravityField extends Entity {

    constructor(position: Vec2, scale: Vec2) {
        super({
            tag: 'player',
            components: [
                new Transform(position, scale),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.Wireframe.CIRCLE),
                new FlatColor(Color.white())
            ]
        });
    }
}
