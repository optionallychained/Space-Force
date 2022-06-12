import { Component } from 'aura-2d';

export class Fuel extends Component {

    public value: number;

    constructor(public readonly initialValue: number) {
        super('Fuel');

        this.value = initialValue;
    }
}
