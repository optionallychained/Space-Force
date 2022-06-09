import { Entity, Game, System, Transform } from 'aura-2d';
import { CircleCollider } from '../component/circleCollider.component';

// partial copy of Aura (Box) Collision System
// to ported into Aura and combined with AABB Collision
export class CircleCollision extends System {

    private collisions: Array<string> = [];

    constructor() {
        super('Collision');
    }

    public tick(game: Game): void {
        const collidables = game.world.filterEntitiesByComponentNames('Transform', 'CircleCollider');

        for (let i = 0; i < collidables.length; i++) {
            for (let j = i + 1; j < collidables.length; j++) {
                const collisionId = `${collidables[i].id}-${collidables[j].id}`;

                if (this.collides(collidables[i], collidables[j])) {
                    if (!this.collisions.includes(collisionId)) {
                        collidables[i].onCollisionStart(game, collidables[j]);
                        collidables[j].onCollisionStart(game, collidables[i]);

                        this.collisions.push(collisionId);
                    }
                    else {
                        collidables[i].onCollisionContinue(game, collidables[j]);
                        collidables[j].onCollisionContinue(game, collidables[i]);
                    }
                }
                else if (this.collisions.includes(collisionId)) {
                    collidables[i].onCollisionEnd(game, collidables[j]);
                    collidables[j].onCollisionEnd(game, collidables[i]);

                    this.collisions.splice(this.collisions.indexOf(collisionId), 1);
                }
            }
        }
    }

    private collides(e1: Entity, e2: Entity): boolean {
        const e1Transform = e1.getComponent<Transform>('Transform');
        const e1Circle = e1.getComponent<CircleCollider>('CircleCollider');
        const e1Radius = e1Circle.radius ?? e1Transform.scale.x / 2; // TODO choosing x is a little esoteric

        const e2Transform = e2.getComponent<Transform>('Transform');
        const e2Circle = e2.getComponent<CircleCollider>('CircleCollider');
        const e2Radius = e2Circle.radius ?? e2Transform.scale.x / 2;

        const e1Pos = e1Transform.position;
        const e2Pos = e2Transform.position;

        const dx = e2Pos.x - e1Pos.x;
        const dy = e2Pos.y - e1Pos.y;

        return dx ** 2 + dy ** 2 < (e1Radius + e2Radius) ** 2;
    }
}
