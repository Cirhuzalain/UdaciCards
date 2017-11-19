import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Label } from 'native-base'
import { addCardToDeck } from '../utils/db'
import { addCard } from '../actions'
import { connect } from 'react-redux'
import styles from './styles'

class AddDeckCard extends Component {

  constructor(props){
    super(props)
    this.deckName = this.props.navigation.state.params.deckName
    this.state = {
      question : '',
      answer : ''
    }
  }

  static navigationOptions = ({ navigation }) => {
     return {
       title: 'Add Card'
     }
  }

  submit = () => {
    const question = this.state.question.trim()
    const answer = this.state.answer.trim()
    if (question.length < 1 || answer.length < 1){
      alert('Short question or Short Answer (> 1 character )')
      return
    }
    const today = new Date().getDate()
    const card = {
      question : question,
      answer : answer,
      timestamp : today
    }

    addCardToDeck(this.deckName, card)
    this.props.dispatch(addCard(card, this.deckName))
    this.props.navigation.navigate('DeckDetail', {deckName : this.deckName})
  }

  render(){
    return (
      <Container>
        <Content>
          <KeyboardAvoidingView>
            <Form style={[styles.center, {margin : 10}]}>
              <Item floatingLabel>
                <Label>Question</Label>
                <Input onChangeText={(question) => this.setState({question})} />
              </Item>
              <Item floatingLabel>
                <Label>Answer</Label>
                <Input onChangeText={(answer) => this.setState({answer})} />
              </Item>
              <Button block onPress={this.submit}>
                <Text style={{ color : '#fff' }}>Submit</Text>
              </Button>
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    )
  }
}

export default connect()(AddDeckCard)
