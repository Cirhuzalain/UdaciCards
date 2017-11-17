import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'UdaciCards:Deck'

export function getDecks(){
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => JSON.parse(data)).catch(error => {
    alert('An error occured while fetching data')
  })
}

export function getDeck(id){
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => JSON.parse(data)[id]).catch(error => {
    alert('An error occured while fetching data')
  })
}

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

export function addCardToDeck(title, card){
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => {
    let decks = JSON.parse(data)
    decks[title].questions.push(card)
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  }).catch(error => {
    alert('An error occured while fetching data')
  })
}
