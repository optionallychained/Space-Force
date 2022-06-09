import { Color, State, Vec2 } from 'aura-2d';

export const MAIN_STATE = new State({
    name: 'main',
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
