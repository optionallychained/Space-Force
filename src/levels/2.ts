import { Vec2 } from 'aura-2d';
import { Level } from './levels';

export const LEVEL_TWO = (worldDimensions: Vec2): Level => ({
    title: {
        text: 'picking it up',
        fontSize: 50
    },
    description: {
        text: 'pick up the coin and get to the green planet',
        fontSize: 22
    },
    playerPosition: new Vec2(0, -worldDimensions.y / 2 + 150),
    playerFuel: 100,
    threeStar: 70,
    twoStar: 40,
    pickupPositions: [
        new Vec2(0, 150)
    ],
    planets: [
        {
            position: new Vec2(0, -worldDimensions.y / 2 + 100),
            size: 50,
            mass: 1000,
            fieldRadius: 100,
            type: 'start'
        },
        {
            position: new Vec2(),
            size: 200,
            mass: 1500,
            fieldRadius: 400,
            type: 'deadly',
        },
        {
            position: new Vec2(0, worldDimensions.y / 2 - 100),
            size: 50,
            mass: 1000,
            fieldRadius: 100,
            type: 'target',
        }
    ]
});
