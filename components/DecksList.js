import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, FlatList, ActivityIndicator, StyleSheet} from 'react-native'
import {fetchDecks, clearAsyncStorage} from '../utils/api'
import {receiveDecks} from '../actions'
import DeckCard from './DeckCard'

class DecksList extends Component{
    state = {
        loading: true
    }
    
    componentDidMount() {
        fetchDecks()
            .then((decks) => this.props.dispatch(receiveDecks(decks)))
            .then(this.setState(() => ({
                loading: false
            })))
    }

    render() {
        const decks = this.props.decks
        const {navigation} = this.props
        
        if(this.state.loading){
            return (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        } else{
            return (
                <View style={styles.center}>
                    {
                        Object.keys(decks).length > 0
                        ?   <FlatList
                                data={Object.values(decks)}
                                renderItem={({ item }) => (
                                    <DeckCard
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        numOfCards={item.cards.length}
                                        navigation={navigation}
                                    />
                                )}
                                keyExtractor={item => item.id}
                            />
                        :   <View style={styles.center}>
                                <Text>You haven't added any decks.</Text>
                                <Text>Navigate to the 'Add Deck' Tab to add decks.</Text>     
                            </View>
                    }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
})

function mapStateToProps(decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(DecksList)