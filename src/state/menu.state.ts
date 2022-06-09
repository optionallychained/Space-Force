import { Color, State, Vec2 } from 'aura-2d';
import { GravityField } from '../entity/gravityField.entity';

export const MENU_STATE = new State({
    name: 'menu',
    init: (game) => {
        game.text.addString(
            'ld38 remake',
            new Vec2(-5 * 50, 0),
            new Vec2(50, 50),
            Color.white()
        );

        game.world.addEntity(new GravityField(new Vec2(0, -200), new Vec2(200, 200)));
    },
    end: (game) => { },
    tick: (game) => { }
});
