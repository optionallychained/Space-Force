import { Game, Vec2 } from 'aura-2d';
import { DEAD_STATE } from './state/dead.state';
import { GAME_STATE } from './state/game.state';
import { LEVEL_SELECT_STATE } from './state/levelSelect.state';

const game = new Game({
    canvasDimensions: new Vec2(1024, 768),
    states: [
        LEVEL_SELECT_STATE,
        GAME_STATE,
        DEAD_STATE
    ]
});

game.start(GAME_STATE.name);
