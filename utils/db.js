import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'UdaciCards:Deck'

/**
*Return a list of deck cards
*/
export function getDecks(){
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => JSON.parse(data)).catch(error => {
    alert('An error occured while fetching data')
  })
}

/**
*Return one deck
*@param id deck name
*/
export function getDeck(id){
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => JSON.parse(data)[id]).catch(error => {
    alert('An error occured while fetching data')
  })
}

/**
*Save a deck
*@param title deck name
*/
export function saveDeckTitle(title){
  AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title] : {
      title : title,
      questions : []
    }
  })).catch(error => {
    alert('An error occured while fetching data')
  })
}

/**
*Return one deck card
*@param title deck title
*@param card  question information
*/
export function addCardToDeck(title, card){
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => {
    let decks = JSON.parse(data)
    decks[title].questions.push(card)
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  }).catch(error => {
    alert('An error occured while fetching data')
  })
}
