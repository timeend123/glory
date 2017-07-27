import {
    DROP_MONSTER_CARDS_FROM_BATTLEFIELD,
    DROP_MONSTER_CARDS_FROM_E_BATTLEFIELD,
    MINUS_ATTACK_TIMES,
    REDUCE_HP,
    REDUCE_E_HP
} from 'reduxs/constant'



const reduceHP = (store, content) => {
    store.dispatch({
        type: REDUCE_HP,
        content
    })
}

const reduceEHP = (store, content) => {
    store.dispatch({
        type: REDUCE_E_HP,
        content
    })
}

function ATTACK (store, next, action) {
    const {
        battleField,
        e_battleField
    } = store.getState()

    const {
        fromIndex,
        toIndex
    } = action.content

    const fromMonster = battleField.firstAreaCards[fromIndex]
    const toMonster   = e_battleField.firstAreaCards[toIndex]

    const result =  toMonster.attack - fromMonster.attack

    const destoryFromMonster = function(){
        store.dispatch(new window.Transer({
            type: DROP_MONSTER_CARDS_FROM_BATTLEFIELD,
            content: {
                index: fromIndex
            }
        }))
    }
    const destoryToMonster   = function(){
        store.dispatch(new window.Transer({
            type: DROP_MONSTER_CARDS_FROM_E_BATTLEFIELD,
            content: {
                index: toIndex
            }
        }))
    }
    store.dispatch(new window.Transer({
        type: MINUS_ATTACK_TIMES,
        content: {
            index: fromIndex
        }
    }))

    if (result === 0) {
        destoryFromMonster()
        destoryToMonster()
    } else if (result > 0) {
        destoryFromMonster()
        reduceHP(store, result * -1)
    } else if (result < 0) {
        destoryToMonster()
        reduceEHP(store, result)
    }

}












export default {
    ATTACK
}




