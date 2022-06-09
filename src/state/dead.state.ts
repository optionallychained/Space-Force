import { State } from 'aura-2d';

export const DEAD_STATE = new State({
    name: 'dead',
    init: (game) => { },
    end: (game) => { },
    tick: (game) => { }
});
