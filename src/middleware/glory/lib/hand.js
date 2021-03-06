import {
    THROW_MONSTER_CARDS_TO_BATTLEFIELD,
    DELETE_HANDCARDS,
    DELETE_E_HANDCARDS,
    THROW_MONSTER_CARDS_TO_E_BATTLEFIELD,
} from 'reduxs/constant'



function get_card_from_hand_to_battle (store, next, action) {
    const {
        fromIndex,
        toIndex
    } = action.content

    const {
        cards
    } = store.getState().handCards

    const card = cards[fromIndex]

    next({
        type: DELETE_HANDCARDS,
        content: {
            index: fromIndex
        }
    })

    next({
        type: THROW_MONSTER_CARDS_TO_BATTLEFIELD,
        content: {
            index: toIndex,
            card
        }
    })

    store.dispatch({
        glory: 'unActiveAll'
    })
}


function get_card_from_e_hand_to_e_battle (store, next, action) {
    const {
        fromIndex,
        toIndex
    } = action.content

    const {
        cards
    } = store.getState().e_handCards

    const card = cards[fromIndex]

    next({
        type: DELETE_E_HANDCARDS,
        content: {
            index: fromIndex
        }
    })

    next({
        type: THROW_MONSTER_CARDS_TO_E_BATTLEFIELD,
        content: {
            index: toIndex,
            card
        }
    })
    
    store.dispatch({
        glory: 'unActiveAll'
    })
}




export default {
    get_card_from_hand_to_battle,
    get_card_from_e_hand_to_e_battle
}