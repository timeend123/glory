import {TrapEntity} from './trapEntity'
import {prototype} from 'decorators'

@prototype({
    describe: 'this is test trap',
    cardName: 'TestTrap',
    effect () {
        console.log('trap effect dodododo')
    }
})
export class TestTrap extends TrapEntity {
    static cardCode = '3';
    static cardName = 'TestTrap'
}

