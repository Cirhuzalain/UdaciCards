export const RECEIVE_CARD = 'RECEIVE_CARD'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveCards(cards){
  return {
    type : RECEIVE_CARD,
    cards
  }
}

export function addDeck(deck){
  return {
    type : ADD_DECK,
    deck
  }
}

export function addCard(card, title){
  return {
    type : ADD_CARD,
    card,
    title
  }
}
