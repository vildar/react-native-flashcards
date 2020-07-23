import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native'
import {addDeck} from '../actions'
import {generateDID} from '../utils/helpers'
import {storeDeck} from '../utils/api'

class AddDeck extends Component {
    state = {
        deckName: ''
    }

    onChangeText = (text) => {
        this.setState(() => ({
            deckName: text
        }))
    }

    handleAddCard = () => {
        const deckID = generateDID()
        const deckName = this.state.deckName
        const deck = {
            id: deckID,
            title: deckName,
            cards: []
        }

        if(deckName === ''){
            Alert.alert(
                'Do not leave the title field empty!',
                'Give the deck a name.',
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        } else {
            this.props.dispatch(addDeck(deckID, deckName))
            storeDeck(deck)
            
            this.props.navigation.navigate('Individual Deck View', {
                deckID: deckID
            })

            this.setState(() => ({
                deckName: ''
            }))
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.center}>
                <TextInput
                    style={styles.inputContainer}
                    onChangeText={text => this.onChangeText(text)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleAddCard}
                >
                    <Text style={styles.content}>Add Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    
    inputContainer: {
        width: 350, 
        height: 45, 
        borderColor: 'gray', 
        backgroundColor: 'white', 
        borderWidth: 1, 
        marginBottom: 20,
        fontSize: 20,
        fontStyle: 'italic'
    },

    button: {
        backgroundColor: 'black', 
        fontSize: 20, 
        height: 40, 
        width: 150,
        justifyContent: 'center'
    },

    content: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
    }
})

export default connect()(AddDeck)