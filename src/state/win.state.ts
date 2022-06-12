import { Color, Keys, State, Vec2 } from 'aura-2d';

export const WIN_STATE = new State({
    name: 'win',
    init: (game) => {
        game.text.addString(
            'win',
            new Vec2(),
            new Vec2(50, 50),
            Color.white()
        );
    },
    end: (game) => {
        game.text.clearEntities();
    },
    tick: (game) => {
        if (game.input.isKeyDown(Keys.SPACE)) {
            game.switchToState('game');
        }
    }
});
