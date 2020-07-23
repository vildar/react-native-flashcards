import AsyncStorage from '@react-native-community/async-storage'

const FLASHCARDS_STORAGE_KEY = 'ReactNative:Flashcards'

export const fetchDecks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        return jsonValue !== null ? JSON.parse(jsonValue) : null
    } catch(e) {
        console.error("Error: ", e)
    }
}

export const storeDeck = async (deck) => {
    try {
        const jsonValue = JSON.stringify({
            [deck.id]: deck
        })
        return await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, jsonValue)
    } catch (e) {
        console.error("Error: ", e)
    }
}

export const storeCard = async (deckID, question, answer) => {
    try {
        const item = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        const data = JSON.parse(item)

        data[deckID] = {
            ...data[deckID],
            cards: [
                ...data[deckID].cards,
                {
                    question,
                    answer
                }
            ]
        }

        const jsonValue = JSON.stringify(data)
        return await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, jsonValue)
    } catch (e) {
        console.error("Error: ", e)
    }
}

export const clearAsyncStorage = async() => {
    return await AsyncStorage.clear()
}