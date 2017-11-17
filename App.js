import React, { Component } from 'react'
import {View, StatusBar} from 'react-native'
import styles from './components/styles'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddDeckCard from './components/AddDeckCard'
import AddDeck from './components/AddDeck'
import DeckQuiz from './components/DeckQuiz'
import { Constants } from 'expo'
import { purple, purpleDark, white } from './utils/colors'
import { StackNavigator } from 'react-navigation'
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { setLocalNotification, clearLocalNotification } from './utils/notification'

const MainNavigator = StackNavigator({
  DeckList : {
    screen : DeckList,
    navigationOptions : {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  DeckDetail : {
    screen : DeckDetail,
    navigationOptions : {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddDeckCard : {
    screen : AddDeckCard,
    navigationOptions : {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddDeck : {
    screen : AddDeck,
    navigationOptions : {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  DeckQuiz : {
    screen : DeckQuiz,
    navigationOptions : {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})

function CardStatusBar ({backgroundColor, ...props}) {
   return (
     <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
       <StatusBar translucent backgroundColor={backgroundColor} {...props} />
     </View>
   )
}

export default class App extends Component {

  state = {
    isReady: false
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({isReady : true})
    setLocalNotification()
  }

  render() {

    if(!this.state.isReady) {
      return (<Expo.AppLoading />)
    }
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex : 1}}>
          <CardStatusBar backgroundColor={ purpleDark } barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
