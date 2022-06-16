import { Color, Keys, State, Vec2 } from 'aura-2d';
import { loadLevel } from '../levels/levels';

export const DEAD_STATE = new State({
    name: 'dead',
    init: (game) => {
        loadLevel(game, game.getData<number>('level'), false);
    },
    end: (game) => {
        game.text.clearEntities();
        game.world.clearEntities();
        game.ui.clearEntities();
    },
    tick: (game) => {
        game.text.clearEntities();
        game.ui.clearEntities();

        if (game.input.isKeyDown(Keys.R)) {
            game.switchToState('game');
        }

        if (game.input.isKeyDown(Keys.SPACE)) {
            game.setData('disablespace', true);
            game.switchToState('levelselect');
        }

        // info readouts
        game.ui.addPanel(
            new Vec2(0, 0),
            new Vec2(game.world.dimensions.x, 100),
            Color.grey(0.2)
        );

        game.ui.addPanel(
            new Vec2(0, -game.world.dimensions.y / 2 + 25 + 10),
            new Vec2(game.world.dimensions.x, 80),
            Color.grey(0.2)
        );

        game.text.addString(
            'you died!',
            new Vec2(-8 * 0.5 * 50),
            new Vec2(50, 50),
            Color.white()
        );

        game.text.addString(
            '[R]:reset',
            new Vec2(game.world.dimensions.x / 2 - (9 * 25), -game.world.dimensions.y / 2 + 35),
            new Vec2(25, 25),
            Color.white()
        );

        game.text.addString(
            '[space]:select level',
            new Vec2(-game.world.dimensions.x / 2 + 20, -game.world.dimensions.y / 2 + 35),
            new Vec2(25, 25),
            Color.white()
        );
    }
});
