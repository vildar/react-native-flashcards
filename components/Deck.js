import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native'

class Deck extends Component {
    checkDeckForCards = (numOfCards, deckID) => {
        if(numOfCards === 0){
            Alert.alert(
                "Haha! Nice Try!",
                'You cannot start a quiz when you haven\'t added any cards to your deck.',
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        } else{
            this.props.navigation.navigate('Quiz View', {
                deckID
            })
        }
    }
    
    render() {
        const {route, navigation} = this.props
        const {deckID} = route.params
        const decks = this.props.decks

        return (
            <View style={styles.center}>
                <Text style={styles.title}>{decks[deckID].title}</Text>
                <Text style={styles.subtitle}>{decks[deckID].cards.length} cards</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Add Card', {
                        deckID
                    })}
                >
                    <Text style={styles.content}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.checkDeckForCards(decks[deckID].cards.length, deckID)}
                >
                    <Text style={styles.content}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    button: {
        backgroundColor: 'black', 
        fontSize: 20, 
        height: 40, 
        width: 150,
        justifyContent: 'center',
        margin: 10, 
    },

    content: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    subtitle: {
        fontSize: 20,
        color: 'gray'
    }
})

function mapStateToProps(decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(Deck)