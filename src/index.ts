import { Game, Vec2 } from 'aura-2d';
import { DEAD_STATE } from './state/dead.state';
import { GAME_STATE } from './state/game.state';
import { LEVEL_SELECT_STATE } from './state/levelSelect.state';
import { MENU_STATE } from './state/menu.state';

const game = new Game({
    canvasDimensions: new Vec2(1024, 768),
    states: [
        MENU_STATE,
        LEVEL_SELECT_STATE,
        GAME_STATE,
        DEAD_STATE
    ]
});

game.start(MENU_STATE.name);
