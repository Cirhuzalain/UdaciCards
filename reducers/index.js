import { RECEIVE_CARD, ADD_DECK, ADD_CARD } from '../actions/types'

function decks(state = {}, action){
  switch(action.type){
    case RECEIVE_CARD :
      return {
        ...state,
        ...action.cards
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck] : {
          title : action.deck,
          questions : []
        }
      }
    case ADD_CARD :
      const newCardsDeck = state[action.title].questions.concat([action.card])
      return {
        ...state,
        [action.title] : {
          title : action.title,
          questions : newCardsDeck
        }
      }
    default:
      return state
  }
}

export default decks
