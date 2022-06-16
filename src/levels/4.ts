import { Vec2 } from 'aura-2d';
import { Level } from './levels';

export const LEVEL_FOUR = (worldDimensions: Vec2): Level => ({
    title: {
        text: 'precision slingshot',
        fontSize: 50
    },
    description: {
        text: 'limited fuel! grab the coin on the way',
        fontSize: 23
    },
    playerPosition: new Vec2(-worldDimensions.x / 2 + 150, -worldDimensions.y / 2 + 200),
    playerFuel: 50,
    // feels weird, but impossible to complete with fuel remaining; always give 3 stars
    threeStar: 0,
    twoStar: 0,
    pickupPositions: [
        new Vec2(worldDimensions.x / 2 - 350, -worldDimensions.y / 2 + 300)
    ],
    planets: [
        {
            position: new Vec2(-worldDimensions.x / 2 + 100, -worldDimensions.y / 2 + 200),
            size: 50,
            mass: 1000,
            fieldRadius: 100,
            type: 'start'
        },
        {
            position: new Vec2(-100, 150),
            size: 200,
            mass: 6000,
            fieldRadius: 450,
            type: 'deadly'
        },
        {
            position: new Vec2(worldDimensions.x / 2 - 100, worldDimensions.y / 2 - 150),
            size: 40,
            mass: 2500,
            fieldRadius: 200,
            type: 'target',
        },
    ]
});
