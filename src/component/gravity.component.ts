import { Component } from 'aura-2d';

export class Gravity extends Component {

    constructor(public readonly fieldRadius: number) {
        super('Gravity');
    }
}
