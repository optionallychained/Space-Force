import { Vec2 } from 'aura-2d';
import { Level } from './levels';

export const LEVEL_FIVE = (worldDimensions: Vec2): Level => ({
    title: {
        text: 'planet hopper',
        fontSize: 50
    },
    description: {
        text: 'touch every blue planet,then get to the green planet',
        fontSize: 18
    },
    playerPosition: new Vec2(worldDimensions.x / 2 - 150, -worldDimensions.y / 2 + 250),
    playerFuel: 180,
    threeStar: 25,
    twoStar: 12.5,
    pickupPositions: [],
    planets: [
        {
            position: new Vec2(worldDimensions.x / 2 - 100, -worldDimensions.y / 2 + 200),
            size: 50,
            mass: 750,
            fieldRadius: 100,
            type: 'start'
        },
        {
            position: new Vec2(worldDimensions.x / 2 - 150, worldDimensions.y / 2 - 250),
            size: 60,
            mass: 1200,
            fieldRadius: 150,
            type: 'musttouch'
        },
        {
            position: new Vec2(-50, -worldDimensions.y / 2 + 350),
            size: 100,
            mass: 1500,
            fieldRadius: 150,
            type: 'musttouch'
        },
        {
            position: new Vec2(-worldDimensions.x / 2 + 200, 150),
            size: 200,
            mass: 3000,
            fieldRadius: 350,
            type: 'musttouch'
        },
        {
            position: new Vec2(-worldDimensions.x / 2 + 150, -worldDimensions.y / 2 + 100),
            size: 75,
            mass: 300,
            fieldRadius: 200,
            type: 'target'
        }
    ]
});
