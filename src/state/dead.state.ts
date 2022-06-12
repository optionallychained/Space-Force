import { Color, Keys, State, Vec2 } from 'aura-2d';

export const DEAD_STATE = new State({
    name: 'dead',
    init: (game) => {
        game.world.clearEntities();
        game.removeSystems('Physics', 'Collision');

        game.text.addString(
            'dead',
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
