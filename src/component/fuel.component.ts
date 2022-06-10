import { Component } from 'aura-2d';

export class Fuel extends Component {

    public value: number;

    constructor(private readonly initialValue: number) {
        super('Fuel');

        this.value = initialValue;
    }

    public reset(): void {
        this.value = this.initialValue;
    }
}
