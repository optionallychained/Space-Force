import { Component } from 'aura-2d';

export class Thrust extends Component {

    public value = 0;
    public impulseThrust = 0;

    constructor(public baseThrust: number) {
        super('Thrust');
    }
}
