// @flow
import {combineReducers} from 'redux';
import {combineEpics} from 'redux-observable';

import configureStore from './CreateStore';
import {Member, Card} from '../Models';

import {
  isFetching,
  members,
  cards,
  currentMember
} from './Reducers';
import {
  searchEpic,
  getCardsByCategoryEpic
} from './Reducers';

import {
  searchEpic
  getCardsByCategoryEpic,
  loginEpic
} from './Actions';

export type ReduxStateType = {
  isFetching: boolean,
  nav: Object,
  members: Member[],
  cards: {
    search: Card[],
    hockey: Card[],
    football: Card[],
    baseball: Card[],
    basketball: Card[]
  },
  currentMember: ?Member
};

export default (navigationReducer: Object) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: navigationReducer,
    isFetching,
    members,
    cards,
    currentMember
  });

  /* ------------- Assemble The Epics ------------- */
  const rootEpic = combineEpics(
    searchEpic,
    getCardsByCategoryEpic,
    loginEpic
  );

  return configureStore(rootReducer, rootEpic);
};
