import { Color, Keys, State, Vec2 } from 'aura-2d';
import { LEVEL_COUNT, loadLevel } from '../levels/levels';

export const WIN_STATE = new State({
    name: 'win',
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

        const lastLevel = game.getData<number>('level') === LEVEL_COUNT - 1;

        if (game.input.isKeyDown(Keys.R)) {
            game.switchToState('game');
        }

        if (game.input.isKeyDown(Keys.SPACE)) {
            if (lastLevel) {
                game.setData('disablespace', true);
                game.switchToState('levelselect');
            }
            else {
                game.setData('level', game.getData<number>('level') + 1);
                game.switchToState('game');
            }
        }

        // info readouts
        game.ui.addPanel(
            new Vec2(0, -5),
            new Vec2(game.world.dimensions.x, 150),
            Color.grey(0.2)
        );

        game.ui.addPanel(
            new Vec2(0, -game.world.dimensions.y / 2 + 25 + 10),
            new Vec2(game.world.dimensions.x, 80),
            Color.grey(0.2)
        );

        game.text.addString(
            'well done!',
            new Vec2(-9 * 0.5 * 50, 25),
            new Vec2(50, 50),
            Color.white()
        );

        const fuelRemaining = `fuel remaining: ${game.getData<number>('fuelRemaining')} %`;
        game.text.addString(
            fuelRemaining,
            new Vec2(-(fuelRemaining.length - 1) * 0.5 * 30, -50),
            new Vec2(30, 30),
            Color.white()
        );

        game.text.addString(
            '[R]:reset',
            new Vec2(game.world.dimensions.x / 2 - (9 * 25), -game.world.dimensions.y / 2 + 35),
            new Vec2(25, 25),
            Color.white()
        );

        game.text.addString(
            lastLevel ? '[space]:select level' : '[space]:next level',
            new Vec2(-game.world.dimensions.x / 2 + 20, -game.world.dimensions.y / 2 + 35),
            new Vec2(25, 25),
            Color.white()
        );
    }
});
