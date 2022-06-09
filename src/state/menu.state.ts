import { Color, State, Vec2 } from 'aura-2d';

export const MENU_STATE = new State({
    name: 'menu',
    init: (game) => {
        game.text.addString(
            'ld38 remake',
            new Vec2(-5 * 50, 0),
            new Vec2(50, 50),
            Color.white()
        );
    },
    end: (game) => { },
    tick: (game) => { }
});
