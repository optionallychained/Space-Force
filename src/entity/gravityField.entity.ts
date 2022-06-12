import { Angle, Color, Entity, FlatColor, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { DASHED_CIRCLE } from '../geometry/dashedCircle.geometry';

export class GravityField extends Entity {

    private dir = 0;

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
        const transform = this.getComponent<Transform>('Transform');

        transform.rotate(Angle.toRadians(0.35));

        // simple scale oscillation for visual flair
        if (transform.scale.x >= transform.initialScale.x * 1.075) {
            this.dir = -1;
        }
        else if (transform.scale.x <= transform.initialScale.x) {
            this.dir = 1;
        }
        transform.scale.set(transform.scale.x + (this.dir * 0.75), transform.scale.y + (this.dir * 0.75));
    }
}
