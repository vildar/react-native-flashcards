import {
    ADD_DECK,
    ADD_CARD,
    RECEIVE_DECKS
} from '../actions'

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks,
            }
        
        case ADD_DECK :
            return {
                ...state,
                [action.deckID]: {
                    id: action.deckID,
                    title: action.title,
                    cards: []                    
                } 
            }
        
        case ADD_CARD :
            const {deckID, answer, question} = action

            return {
                ...state,
                [deckID]: {
                    ...state[deckID],
                    cards: [
                        ...state[deckID].cards,
                        {
                            question,
                            answer
                        }
                    ]
                }
            }
        default :
            return state
    }
  }