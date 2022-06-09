import { Game, Vec2 } from 'aura-2d';
import { MAIN_STATE } from './state/main.state';

const game = new Game({
    canvasDimensions: new Vec2(1024, 768),
    states: [
        MAIN_STATE
    ]
});

game.start(MAIN_STATE.name);
