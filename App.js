import React, {Component} from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import DecksList from './components/DecksList'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function defaultView() {
  return (
    <Tab.Navigator 
      initialRouteName="Decks"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Decks') {
            return <MaterialCommunityIcons name="cards" size={size} color={color} />
          } else if (route.name === 'Add Deck') {
            return <Ionicons name="md-add-circle" size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0AB9A5',
        inactiveTintColor: 'black',
      }}
    >
      <Tab.Screen name="Decks" component={DecksList} />
      <Tab.Screen name="Add Deck" component={AddDeck} />
    </Tab.Navigator>
  )
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  
  render(){
    const store = createStore(reducer)

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={defaultView} options={{title: 'Decks'}}/>
            <Stack.Screen name="Individual Deck View" component={Deck} />
            <Stack.Screen name="Add Card" component={AddCard} />
            <Stack.Screen name="Quiz View" component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}