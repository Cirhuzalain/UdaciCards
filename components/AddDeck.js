import React, {Component} from 'react'
import {View, Text } from 'react-native'
import {Container, Header, Content, Form, Item, Input, Button, Label} from 'native-base'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/db'
import {connect} from 'react-redux'
import styles from './styles'
import { setLocalNotification, clearLocalNotification } from '../utils/notification'

class AddDeck extends Component {

  state = {
    title : ''
  }

  static navigationOptions = ({ navigation }) => {
     return {
       title: 'Add Deck'
     }
  }

  submit = () => {
    const title = this.state.title.trim()
    if (title.length < 1){
      alert('Short Deck Name (>= 1 character)')
      return
    }

    saveDeckTitle(title)

    this.props.dispatch(addDeck(title))

    this.props.navigation.navigate('DeckList')

    
  }

  render(){
    return (
      <Container>
        <Content>
          <Form style={[styles.center, {margin : 20}]}>
            <Item floatingLabel>
              <Label>Deck Title</Label>
              <Input onChangeText={(text) => this.setState({title : text}) } />
            </Item>
            <Button block onPress={this.submit}>
              <Text style={{ color : '#fff' }}>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default connect()(AddDeck)
