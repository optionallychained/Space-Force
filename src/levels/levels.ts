import { Entity, Game, Vec2 } from 'aura-2d';
import { Pickup } from '../entity/pickup.entity';
import { FuelBar } from '../entity/fuelBar.entity';
import { Planet, PlanetType } from '../entity/planet.entity';
import { Player } from '../entity/player.entity';
import { LEVEL_ONE } from './1';
import { LEVEL_TWO } from './2';

export interface LevelText {
    text: string;
    fontSize: number;
}

export interface Level {
    title: LevelText,
    description: LevelText,
    playerPosition: Vec2;
    playerFuel: number;
    pickupPositions: Array<Vec2>;
    planets: Array<{
        position: Vec2;
        size: number;
        mass: number;
        fieldRadius: number;
        type: PlanetType;
    }>;
}

const levels: Array<(worldDimensions: Vec2) => Level> = [
    LEVEL_ONE,
    LEVEL_TWO
];

export const loadLevel = (game: Game, num: number): void => {
    const selectedLevel = levels[num](game.world.dimensions);

    // required points = numMustTouch + numPickup
    let requiredPoints = 0;
    const entities: Array<Entity> = [];

    for (const planet of selectedLevel.planets) {
        entities.push(...Planet.makePair(planet.position, planet.size, planet.mass, planet.fieldRadius, planet.type));

        if (planet.type === 'musttouch') {
            requiredPoints++;
        }
    }

    for (const pickupPosition of selectedLevel.pickupPositions) {
        requiredPoints++;

        entities.push(new Pickup(pickupPosition));
    }

    game.world.addEntities(
        ...entities,
        new FuelBar(new Vec2(0, -game.world.dimensions.y / 2 + 25), game.world.dimensions.x - 50),
        new Player(selectedLevel.playerPosition, selectedLevel.playerFuel),
    );

    game.setData('requiredPoints', requiredPoints);
    game.setData('points', 0);
    game.setData('displayLevelText', true);
    game.setData('levelTitle', selectedLevel.title);
    game.setData('levelDescription', selectedLevel.description);
};
