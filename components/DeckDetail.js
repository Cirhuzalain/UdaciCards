import React, {Component} from 'react'
import {View, Text } from 'react-native'
import {Container, Content, Button, Card, CardItem} from 'native-base'
import {connect} from 'react-redux'
import styles from './styles'

class DeckDetail extends Component {

  constructor(props){
    super(props)
    this.deckName = props.navigation.state.params.deckName
  }

  static navigationOptions = ({ navigation }) => {
     return {
       title: navigation.state.params.deckName
     }
  }

  render(){
    const deckInfo = this.props.decks[this.deckName]
    return (
      <View style={[styles.center, {flex : 1}]}>
        <View style={[styles.center, {margin : 50}]}>
          <Text style={{fontSize : 20}}>{ deckInfo.title }</Text>
          <Text style={{fontSize : 20}}>{ deckInfo.questions.length > 1 ? `${deckInfo.questions.length} cards` : `${deckInfo.questions.length} card`}</Text>
        </View>
        <Button block style={{ margin : 20}} onPress={() => this.props.navigation.navigate('AddDeckCard', {deckName : this.deckName})}>
          <Text style={{ color : '#fff' }}>Add Card</Text>
        </Button>
        <Button block style={{ margin : 20}} onPress={() => this.props.navigation.navigate('DeckQuiz', {deckName : this.deckName})}>
          <Text style={{ color : '#fff' }}>Start Quiz</Text>
        </Button>
      </View>
    )
  }
}

function mapStateToProps(decks){
  return {decks}
}

export default connect(mapStateToProps)(DeckDetail)
