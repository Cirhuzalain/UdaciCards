import {RECEIVE_CARD, ADD_DECK, ADD_CARD} from './types'

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
