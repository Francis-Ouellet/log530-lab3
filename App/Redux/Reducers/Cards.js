// @flow
import {Card} from '../../Models';
import {SEARCH, RECEIVED_RESPONSE} from '../Actions';

export function cards(state: Card[] = [], action: {type: Object, data: Object}): Card[] {
  switch (action.type) {
    case RECEIVED_RESPONSE:
      if (action.data.originAction && action.data.originAction === SEARCH && action.data.cards) {
        return action.data.cards;
      }
      return state;

    default:
      return state;
  }
}
