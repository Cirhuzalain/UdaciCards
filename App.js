import React, { Component } from 'react'
import {View, StatusBar} from 'react-native'
import styles from './components/styles'
import { Constants } from 'expo'
import { purpleDark } from './utils/colors'
import store from './store'
import { Provider } from 'react-redux'
import MainNavigator from './routes/routes'
import { setLocalNotification, clearLocalNotification } from './utils/notification'

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
      <Provider store={store}>
        <View style={{flex : 1}}>
          <CardStatusBar backgroundColor={ purpleDark } barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
