import {
    CLICK_BATTLE_FIELD,
    CLICK_E_BATTLE_FIELD,
    CLICK_E_ROLE
} from 'reduxs/constant'

import * as inputConstant from 'reduxs/constant/input'


import { Observable } from 'rxjs/Observable';

const unActiveAll = {
    glory: 'unActiveAll'
}

export default (action$, store) => 
    Observable.merge(
        ...Object.values(inputConstant).map(input => action$.ofType(input))
    )
    .pairwise()
    .map(xs => {

        const first = xs.$firstOne()
        const last  = xs.$lastOne()
        // const stateSnapshot = store.getState()
        if (
            (first.type === CLICK_BATTLE_FIELD) && 
            (last.type === CLICK_E_ROLE)
        ) {
            return {
                glory: 'attack',
                content: {
                    fromIndex: first.content.index,
                    toIndex: 'e_role'
                }
            }
        }

        if (
            (first.type !== CLICK_BATTLE_FIELD) ||
            (last.type  !== CLICK_E_BATTLE_FIELD)
        ) { return unActiveAll }




        return {
            glory: 'attack',
            content: {
                fromIndex: first.content.index,
                toIndex: last.content.index
            }
        }
    })


