import { Angle, Color, Entity, FlatColor, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { DASHED_CIRCLE } from '../geometry/dashedCircle.geometry';

export class GravityField extends Entity {

    constructor(position: Vec2, scale: Vec2) {
        super({
            tag: 'gravityField',
            components: [
                new Transform(position, scale),
                new Shader(ShaderPrograms.BASIC),
                new Model(DASHED_CIRCLE),
                new FlatColor(Color.white())
            ]
        });
    }

    public tick(): void {
        this.getComponent<Transform>('Transform').rotate(Angle.toRadians(0.5));
    }
}
