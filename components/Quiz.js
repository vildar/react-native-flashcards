import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { StackActions } from '@react-navigation/native'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'

class Quiz extends Component {
    state = {
        cardNumber: 0,
        questionView: true,
        correct: 0,
        incorrect: 0,
    }

    updateQuestionViewState = () => {
        this.setState(() => ({
            questionView: !this.state.questionView
        }))
    }

    handleNextCard = (value) => {
        let cardNumber = this.state.cardNumber
        let correct = this.state.correct
        let incorrect = this.state.incorrect

        cardNumber++
        this.setState(() => ({
            cardNumber
        }))

        if(value === 'c'){
            correct++
            this.setState(() => ({
                correct,
                questionView: true
            }))
        } else{
            incorrect++
            this.setState(() => ({
                incorrect,
                questionView: true
            }))
        }
    }

    resetState = () => {
        this.setState(() => ({
            cardNumber: 0,
            questionView: true,
            correct: 0,
            incorrect: 0,
        }))
    }

    render() {
        const {route} = this.props
        const {deckID} = route.params
        const decks = this.props.decks
        const cards = decks[deckID].cards

        return (
            <View style={styles.center}>
                {
                    this.state.cardNumber <= cards.length - 1
                    ?   <View>
                            {
                                this.state.questionView
                                ?   <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={styles.title}>{cards[this.state.cardNumber].question}</Text>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => this.updateQuestionViewState()}
                                        >
                                            <Text style={styles.content}>Answer</Text>
                                        </TouchableOpacity>    
                                    </View>
                                :   <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={styles.title}>{cards[this.state.cardNumber].answer}</Text>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => this.updateQuestionViewState()}
                                        >
                                            <Text style={styles.content}>Question</Text>
                                        </TouchableOpacity>    
                                    </View>
                            }
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity
                                    style={[styles.button, {backgroundColor: 'green'}]}
                                    onPress={() => this.handleNextCard('c')}
                                >
                                    <Text style={styles.content}>
                                        Correct
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, {backgroundColor: 'red'}]}
                                    onPress={() => this.handleNextCard('ic')}
                                >
                                    <Text style={styles.content}>
                                        Incorrect
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.subtitle}>{cards.length - this.state.cardNumber - 1} cards remaining.</Text> 
                            </View>
                        </View>
                    :   <View style={styles.center}>
                            <Text style={styles.title}>{this.state.correct} out of {cards.length} questions answered correctly.</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    clearLocalNotification().then(setLocalNotification)
                                    this.resetState()
                                }}
                            >
                                <Text style={styles.content}>
                                    Restart Quiz
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    clearLocalNotification().then(setLocalNotification)
                                    this.props.navigation.dispatch(StackActions.pop(1))
                                }}
                            >
                                <Text style={styles.content}>
                                    Back to Deck
                                </Text>
                            </TouchableOpacity>    
                        </View>
                }
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
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    subtitle: {
        fontSize: 15,
        fontStyle: 'italic',
        textAlign: 'center',
        color: 'gray'
    }
})

function mapStateToProps(decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)