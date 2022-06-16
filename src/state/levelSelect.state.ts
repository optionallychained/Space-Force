import { Color, Keys, State, Vec2 } from 'aura-2d';
import { LevelText, LEVEL_COUNT, loadLevel } from '../levels/levels';

let keyOn = false;

export const LEVEL_SELECT_STATE = new State({
    name: 'levelselect',
    init: (game) => {
        loadLevel(game, game.getData<number>('level'));
    },
    end: (game) => {
        game.text.clearEntities();
        game.ui.clearEntities();
        game.world.clearEntities();
    },
    tick: (game) => {
        game.text.clearEntities();
        game.ui.clearEntities();

        let level = game.getData<number>('level');

        if (game.input.isKeyDown(Keys.D)) {
            if (!keyOn) {
                if (++level > LEVEL_COUNT - 1) {
                    level = 0;
                }
                keyOn = true;
            }
        }
        else if (game.input.isKeyDown(Keys.A)) {
            if (!keyOn) {
                if (--level < 0) {
                    level = LEVEL_COUNT - 1;
                }
                keyOn = true;
            }
        }
        else {
            keyOn = false;
        }

        if (level !== game.getData<number>('level')) {
            game.setData('level', level);
            // another interesting circular state switch...
            game.switchToState('levelselect');
        }

        if (game.input.isKeyDown(Keys.SPACE)) {
            if (!game.getData<boolean>('disablespace')) {
                game.switchToState('game');
            }
        }
        else {
            game.setData<boolean>('disablespace', false);
        }

        // info readouts
        const title = game.getData<LevelText>('levelTitle');
        const desc = game.getData<LevelText>('levelDescription');

        game.ui.addPanel(
            new Vec2(0, title.fontSize / 2),
            new Vec2(game.world.dimensions.x, (title.fontSize + desc.fontSize) * 2),
            Color.grey(0.2)
        );

        game.ui.addPanel(
            new Vec2(0, game.world.dimensions.y / 2 - 40),
            new Vec2(game.world.dimensions.x, 150),
            Color.grey(0.2)
        );

        game.ui.addPanel(
            new Vec2(0, -game.world.dimensions.y / 2 + 25 + 10),
            new Vec2(game.world.dimensions.x, 80),
            Color.grey(0.2)
        );

        game.text.addString(
            title.text,
            new Vec2(-(title.text.length - 1) * 0.5 * title.fontSize, title.fontSize),
            new Vec2(title.fontSize, title.fontSize),
            Color.cyan()
        );

        game.text.addString(
            desc.text,
            new Vec2(-(desc.text.length - 1) * 0.5 * desc.fontSize, -desc.fontSize / 2),
            new Vec2(desc.fontSize, desc.fontSize),
            Color.rgba(255, 0, 255)
        );

        game.text.addString(
            'space force',
            new Vec2(-10 * 0.5 * 75, game.world.dimensions.y / 2 - 60),
            new Vec2(75, 75),
            Color.yellow()
        );

        game.text.addString(
            '[space]:play',
            new Vec2(-11 * 0.5 * 25, -game.world.dimensions.y / 2 + 35),
            new Vec2(25, 25),
            Color.white()
        );

        game.text.addString(
            '[A]:prev',
            new Vec2(-game.world.dimensions.x / 2 + 20, -game.world.dimensions.y / 2 + 35),
            new Vec2(25, 25),
            Color.white()
        );

        game.text.addString(
            '[D]:next',
            new Vec2(game.world.dimensions.x / 2 - (8 * 25), -game.world.dimensions.y / 2 + 35),
            new Vec2(25, 25),
            Color.white()
        );
    }
});
