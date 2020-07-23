import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native'
import {addCard} from '../actions'
import {storeCard} from '../utils/api'
import { StackActions } from '@react-navigation/native'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    onChangeQuestionText = (text) => {
        this.setState(() => ({
            question: text
        }))
    }

    onChangeAnswerText = (text) => {
        this.setState(() => ({
            answer: text
        }))
    }

    handleAddCard = (deckID) => {
        const {question, answer} = this.state
        
        if(question === '' || answer === ''){
            Alert.alert(
                'Do not leave fields empty!',
                'You cannot have a card with no questions or answers.',
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        } else {
            this.props.dispatch(addCard(deckID, question, answer))
            storeCard(deckID, question, answer)
            
            this.props.navigation.dispatch(StackActions.pop(1))

            this.setState(() => ({
                question: '',
                answer: '',
            }))
        }
    }

    render() {
        const {route} = this.props
        const {deckID} = route.params
        return (
            <KeyboardAvoidingView style={styles.center}>
                <Text style={styles.title}>Question:</Text>
                <TextInput
                    style={styles.inputContainer}
                    onChangeText={text => this.onChangeQuestionText(text)}
                />
                <Text style={styles.title}>Answer:</Text>
                <TextInput
                    style={styles.inputContainer}
                    onChangeText={text => this.onChangeAnswerText(text)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleAddCard(deckID)}
                >
                    <Text style={styles.content}>Add</Text>
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
        justifyContent: 'center',
        margin: 10, 
    },

    content: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
    }
})


export default connect()(AddCard)