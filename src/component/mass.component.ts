import { Component } from 'aura-2d';

export class Mass extends Component {

    constructor(public readonly value: number) {
        super('Mass');
    }
}
