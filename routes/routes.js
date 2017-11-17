import { StackNavigator } from 'react-navigation'
import DeckList from '../components/DeckList'
import DeckDetail from '../components/DeckDetail'
import AddDeckCard from '../components/AddDeckCard'
import AddDeck from '../components/AddDeck'
import DeckQuiz from '../components/DeckQuiz'
import { purple, white } from '../utils/colors'

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

export default MainNavigator
