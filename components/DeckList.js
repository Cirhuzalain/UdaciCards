import React, {Component} from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Button, Body, Icon, Text, List, ListItem, Card, CardItem, Fab } from 'native-base'
import { purple } from '../utils/colors'
import { getDecks } from '../utils/db'
import { receiveCards } from '../actions'
import { connect } from 'react-redux'
import styles from './styles'

class DeckList extends Component {

  static navigationOptions = ({ navigation }) => {
     return {
       title: 'UdaciCards'
     }
  }

  componentDidMount(){
    getDecks().then(data => this.props.dispatch(receiveCards(data)))
  }

  render(){
    const deckCards = Object.values(this.props.decks)
    return (
      <View style={{flex : 1}}>
        <List
          dataArray={deckCards}
          renderRow={(item) =>
            <ListItem style={{marginLeft : 0, paddingLeft : 10}}>
              <TouchableOpacity style={{flex : 1 }} onPress={() => this.props.navigation.navigate('DeckDetail', {deckName : item.title})}>
                <Card style={{ elevation : 3, backgroundColor : '#757575' }}>
                  <CardItem>
                    <Body style={styles.center}>
                      <Text>{item.title}</Text>
                      <Text>{item.questions.length > 1 ? `${item.questions.length} cards` : `${item.questions.length} card`} </Text>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </ListItem>
        } />
        <Fab
          direction="up"
          style={{ backgroundColor: purple }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('AddDeck')}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

function mapStateToProps(decks){
  return {decks}
}

export default connect(mapStateToProps)(DeckList)
