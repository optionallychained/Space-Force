import { Angle, Color, Physics, State, Transform, Vec2 } from 'aura-2d';
import { Coin } from '../entity/coin.entity';
import { Player } from '../entity/player.entity';
import { CircleCollision } from '../system/circleCollision.system';

export const MENU_STATE = new State({
    name: 'menu',
    init: (game) => {
        game.addSystems(Physics, CircleCollision);

        game.text.addString(
            'ld38 remake',
            new Vec2(-5 * 50, 0),
            new Vec2(50, 50),
            Color.white()
        );

        // collision test
        game.world.addEntity(new Coin(new Vec2(0, -100)));
        const player = new Player();
        const transform = player.getComponent<Transform>('Transform');
        transform.position.set(100, -100);
        transform.velocity.set(0, 100);
        transform.rotate(Angle.toRadians(-90));
        game.world.addEntity(player);
    },
    end: (game) => { },
    tick: (game) => { }
});
