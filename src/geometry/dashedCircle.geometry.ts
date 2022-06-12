import { Geometry, GLShape } from 'aura-2d';

export const DASHED_CIRCLE = new Geometry({
    name: 'circle_dashed',
    vertices: Float32Array.from((() => {
        const vertices: Array<number> = [];
        const vertexSize = 2;
        const points = 60;

        for (let i = vertexSize; i < points * vertexSize * 0.5; i += vertexSize) {
            const angle = 2 * i * Math.PI / (points - 2);

            vertices.push(Math.cos(angle) * 0.5);
            vertices.push(Math.sin(angle) * 0.5);
        }

        return vertices;
    })()),
    vertexSize: 2,
    vertexCount: 29,
    glShape: GLShape.LINES,
    textureCoordinates: Float32Array.from([
    ])
});
