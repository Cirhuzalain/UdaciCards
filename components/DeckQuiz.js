import React, {Component} from 'react'
import {View, Text, Animated } from 'react-native'
import { Card, CardItem, DeckSwiper, Container, Body, Button } from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'


class DeckQuiz extends Component {

  constructor(props){
    super(props)
    this.deckName = this.props.navigation.state.params.deckName
    this.deckInfo = this.props.decks[this.deckName]
    this.state = {
      answer : false,
      attempt : false,
      card : 0,
      score : 0,
      bounceValue: new Animated.Value(1)
    }
    for (let q of this.deckInfo.questions){
      q['isAnswer'] = false
    }
  }

  static navigationOptions = ({ navigation }) => {
     return {
       title: 'Deck Quiz'
     }
  }

  correct = (question, container) => {
    return function(e){
      if(question.isAnswer){
        alert('You have already answer this question')
        return
      }
      if (!container.state.attempt) container.setState({attempt : true})
      if(question.answer.toLowerCase().includes("yes") || question.answer.toLowerCase().includes("correct")){
        container.setState({score : container.state.score + 1})
        alert("Good answer")
      }else{
        alert("Wrong answer")
      }
      question.isAnswer = true
    }

  }

  incorrect = (question, container) => {
    return function(e){
      if(question.isAnswer){
        alert('You have already answered this question')
        return
      }
      if (!container.state.attempt) container.setState({attempt : true})
      if(question.answer.toLowerCase().includes("no") || question.answer.toLowerCase().includes("incorrect")){
        container.setState({score : container.state.score + 1})
        alert("Good answer")
      }else{
        alert("Wrong answer")
      }
      question.isAnswer = true
    }
  }

  swipe = () => {
    this.state.card >= this.deckInfo.length ? this.setState({card : 1}) : this.setState({card : this.state.card + 1 })
    this.setState({answer : false})
    if (this.state.card == this.deckInfo.questions.length -1){

      if(this.state.attempt){
        alert(`You've reached the end of the quiz, You've got : ${this.state.score} / ${this.deckInfo.questions.length}`)
      }else{
        alert('You have reached the end of the quiz and you did not answered to any question')
      }
      this.setState({card : 0, score : 0})
    }
  }

  render(){
    const { bounceValue } = this.state
    if (this.deckInfo.questions.length == 0){
      return (
        <View style={[styles.center, { flex : 1 }]}>
          <Text style={{ fontSize : 20 }}>There is no card  on this deck</Text>
        </View>
      )
    }
    return (
      <Container>
        <View style={{ margin : 30 }}>
          <DeckSwiper
            onSwipeLeft={this.swipe}
            onSwipeRight={this.swipe}
            dataSource={this.deckInfo.questions}
            renderItem={ item =>
              <Card style={{elevation : 3, padding : 30}}>
                <CardItem cardBody>
                  <Body style={styles.center}>
                    <Text style={{ fontSize : 15 }}>{`${this.state.card % this.deckInfo.questions.length + 1} / ${this.deckInfo.questions.length}`}</Text>
                    {
                      !this.state.answer ?
                      <Animated.Text style={[{fontSize : 20},  {transform: [{scale: bounceValue}]}]}>{item.question}</Animated.Text> :
                      <Animated.Text style={[{fontSize : 20},  {transform: [{scale: bounceValue}]}]}>{item.answer}</Animated.Text>
                    }
                    <Button block style={{ margin : 15 }} onPress={() => {
                      this.state.answer ? this.setState({answer : false}) : this.setState({answer : true})
                      Animated.sequence([
                        Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
                        Animated.spring(bounceValue, { toValue: 1, friction: 4})
                      ]).start()
                      }}>
                      <Text style={{ color : '#fff' }}>{this.state.answer ? 'Question' : 'Answer' }</Text>
                    </Button>
                    <Button block style={{ margin : 15 }} onPress={this.correct(item, this)}>
                      <Text style={{ color : '#fff' }}>Correct</Text>
                    </Button>
                    <Button block style={{ margin : 15 }} onPress={this.incorrect(item, this)}>
                      <Text style={{ color : '#fff' }}>Incorrect</Text>
                    </Button>
                  </Body>
                </CardItem>
              </Card>
            }/>
        </View>
      </Container>
    )
  }
}

function mapStateToProps(decks){
  return {decks}
}

export default connect(mapStateToProps)(DeckQuiz)
