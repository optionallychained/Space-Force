import { Component } from 'aura-2d';

// to be ported into Aura
export class CircleCollider extends Component {

    constructor(public readonly radius?: number) {
        super('CircleCollider');
    }
}
