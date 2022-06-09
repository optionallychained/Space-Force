import { Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Player extends Entity {

    constructor() {
        super({
            tag: 'player',
            components: [
                new Transform(new Vec2(), new Vec2(30, 30)),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.TRIANGLE),
                new FlatColor(Color.white())
            ]
        });
    }
}
