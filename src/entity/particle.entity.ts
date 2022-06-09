import { Color, Entity, FlatColor, Game, Geometries, Model, Random, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Particle extends Entity {

    private ttl = Random.between(300, 800);
    private time = 0;

    constructor(position: Vec2, angle: number) {
        super({
            tag: 'particle',
            components: [
                new Transform(position, new Vec2(10, 10), angle, new Vec2(Random.between(-100, 100), Random.between(-150, -100))),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.SQUARE),
                // color somewhere between red and yellow; shades of orange on average
                // use potential negative on green to increase chances of pure red (-g clamped to 0)
                new FlatColor(Color.rgba(255, Random.between(-50, 225), 0))
            ]
        });
    }

    public tick(game: Game, frameDelta: number): void {
        this.time += frameDelta;
        if (this.time >= this.ttl) {
            game.world.removeEntity(this);
        }
    }
}
