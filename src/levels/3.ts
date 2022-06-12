import { Vec2 } from 'aura-2d';
import { Level } from './levels';

export const LEVEL_THREE = (worldDimensions: Vec2): Level => ({
    title: {
        text: 'slingshot',
        fontSize: 50
    },
    description: {
        text: 'limited fuel! get to the green planet',
        fontSize: 25
    },
    playerPosition: new Vec2(-worldDimensions.x / 2 + 150, -worldDimensions.y / 2 + 200),
    playerFuel: 50,
    pickupPositions: [],
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
