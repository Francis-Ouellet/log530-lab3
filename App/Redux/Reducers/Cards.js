// @flow
import {combineReducers} from 'redux';

import {Card, Collection} from '../../Models';
import {
  SEARCH,
  RECEIVED_RESPONSE,
  CLEAR_CARDS,
  GET_CARDS_BY_CATEGORY
} from '../Actions';

function _checkOriginAction(action: Object, actionType: string): boolean {
  return action.data.originAction && action.data.originAction === actionType;
}

function search(state: Card[] = [], action: Object): Card[] {
  switch (action.type) {
    case RECEIVED_RESPONSE:
      if (_checkOriginAction(action, SEARCH) && action.data.cards) {
        return action.data.cards;
      }
      return state;

    case CLEAR_CARDS:
      if (
        action.category === 'all' ||
        action.category.toLowerCase() === 'search' ||
        typeof action.category === 'undefined'
      ) {
        return [];
      }
      return state;

    default:
      return state;
  }
}

function hockey(state: Card[] = [], action: Object) {
  switch(action.type) {
    case RECEIVED_RESPONSE:
      if (_checkOriginAction(action, GET_CARDS_BY_CATEGORY) && action.data.category === Collection.TYPE_HOCKEY) {
        return action.data.cards;
      }
      return state;

    case CLEAR_CARDS:
      if (
        action.category === 'all' ||
        action.category.toUpperCase() === Collection.TYPE_HOCKEY ||
        typeof action.category === 'undefined'
      ) {
        return [];
      }
      return state;

    default:
      return state;
  }
}

function football(state: Card[] = [], action: Object) {
  switch(action.type) {
    case RECEIVED_RESPONSE:
      if (_checkOriginAction(action, GET_CARDS_BY_CATEGORY) && action.data.category === Collection.TYPE_FOOTBALL) {
        return action.data.cards;
      }
      return state;

    case CLEAR_CARDS:
      if (
        action.category === 'all' ||
        action.category.toUpperCase() === Collection.TYPE_FOOTBALL ||
        typeof action.category === 'undefined'
      ) {
        return [];
      }
      return state;

    default:
      return state;
  }
}

function baseball(state: Card[] = [], action: Object) {
  switch(action.type) {
    case RECEIVED_RESPONSE:
      if (_checkOriginAction(action, GET_CARDS_BY_CATEGORY) && action.data.category === Collection.TYPE_BASEBALL) {
        return action.data.cards;
      }
      return state;

    case CLEAR_CARDS:
      if (
        action.category === 'all' ||
        action.category.toUpperCase() === Collection.TYPE_BASEBALL ||
        typeof action.category === 'undefined'
      ) {
        return [];
      }
      return state;

    default:
      return state;
  }
}

function basketball(state: Card[] = [], action: Object) {
  switch(action.type) {
    case RECEIVED_RESPONSE:
      if (_checkOriginAction(action, GET_CARDS_BY_CATEGORY) && action.data.category === Collection.TYPE_BASKETBALL) {
        return action.data.cards;
      }
      return state;

    case CLEAR_CARDS:
      if (
        action.category === 'all' ||
        action.category.toUpperCase() === Collection.TYPE_BASKETBALL ||
        typeof action.category === 'undefined'
      ) {
        return [];
      }
      return state;

    default:
      return state;
  }
}

export default combineReducers({
  search,
  hockey,
  football,
  baseball,
  basketball
});
