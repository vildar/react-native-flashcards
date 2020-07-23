import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

class DeckCard extends Component {
    render(){
        const {id, title, numOfCards, navigation} = this.props

        return (
            <TouchableOpacity
                style={styles.card}    
                onPress={() => navigation.navigate('Individual Deck View', {
                        deckID: id
                })}
            >
                <Text style={[styles.center, styles.title]}>{title}</Text>
                <Text style={[styles.center, styles.subtitle]}>{numOfCards} Cards</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 350,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    center: {
        textAlign: 'center'
    },

    title: {
        flex: 1,
        justifyContent: 'flex-start',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
    },

    subtitle: {
        color: 'grey',  
        fontStyle: 'italic'
    }
})

export default connect()(DeckCard)