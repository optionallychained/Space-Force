import { Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { Fuel } from '../component/fuel.component';

// TODO in original, fuelbar was solid and green >=75%, yellow >=25%, red other
// can't currently reproduce this in Aura due to internal limitations in entity grouping and vertex compilation
// all potential workarounds to achieve the visual effect are fiddly and undesirable, so feature is left for now
export class FuelBar extends Entity {

    constructor(position: Vec2, length: number) {
        super({
            tag: 'fuelBar',
            components: [
                new Transform(position, new Vec2(length, 25)),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.SQUARE),
                new FlatColor(Color.yellow())
            ]
        });
    }

    public tick(game: Game): void {
        const fuel = game.world.filterEntitiesByTag('player')[0]?.getComponent<Fuel>('Fuel');

        if (fuel) {
            const transform = this.getComponent<Transform>('Transform');
            transform.scale.setX(transform.initialScale.x * fuel.value / fuel.initialValue);
        }
    }
}
