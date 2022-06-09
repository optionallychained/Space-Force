import { Color, Keys, State, Vec2 } from 'aura-2d';

export const LEVEL_SELECT_STATE = new State({
    name: 'levelselect',
    init: (game) => {
        game.text.addString(
            'Thruster Pack',
            new Vec2(-12 * 0.5 * 75, game.world.dimensions.y / 2 - 75),
            new Vec2(75, 75),
            Color.yellow()
        );

        game.text.addString(
            'Select: [Space]',
            new Vec2(-14 * 0.5 * 40, -game.world.dimensions.y / 2 + 50),
            new Vec2(40, 40),
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
