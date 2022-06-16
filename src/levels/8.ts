import { Vec2 } from 'aura-2d';
import { Level } from './levels';

export const LEVEL_EIGHT = (worldDimensions: Vec2): Level => ({
    title: {
        text: 'hardcore',
        fontSize: 50
    },
    description: {
        text: 'collect the coins,touch the blues and get to the green planet',
        fontSize: 16
    },
    playerPosition: new Vec2(0, 120),
    playerFuel: 200,
    threeStar: 70,
    twoStar: 40,
    pickupPositions: [
        new Vec2(worldDimensions.x / 2 - 150, -worldDimensions.y / 2 + 350),
        new Vec2(),
        new Vec2(-200, -200)
    ],
    planets: [
        {
            position: new Vec2(0, worldDimensions.y / 2 - 200),
            size: 100,
            mass: 2000,
            fieldRadius: 250,
            type: 'start'
        },
        {
            position: new Vec2(worldDimensions.x / 2 - 100, worldDimensions.y / 2 - 250),
            size: 125,
            mass: 2500,
            fieldRadius: 400,
            type: 'deadly'
        },
        {
            position: new Vec2(worldDimensions.x / 2 - 150, -worldDimensions.y / 2 + 175),
            size: 150,
            mass: 2500,
            fieldRadius: 400,
            type: 'musttouch'
        },
        {
            position: new Vec2(0, -worldDimensions.y / 2 + 200),
            size: 100,
            mass: 2750,
            fieldRadius: 400,
            type: 'deadly'
        },
        {
            position: new Vec2(-worldDimensions.x / 2 + 150, worldDimensions.y / 2 - 300),
            size: 150,
            mass: 3500,
            fieldRadius: 350,
            type: 'musttouch'
        },
        {
            position: new Vec2(-worldDimensions.x / 2 + 100, -worldDimensions.y / 2 + 100),
            size: 100,
            mass: 3250,
            fieldRadius: 300,
            type: 'target'
        }
    ]
});
