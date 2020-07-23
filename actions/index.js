export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function addDeck (deckID, title) {
    return {
        type: ADD_DECK,
        deckID,
        title
    }
} 

export function addCard (deckID, question, answer) {
    return {
        type: ADD_CARD,
        deckID,
        question, 
        answer
    }
} 