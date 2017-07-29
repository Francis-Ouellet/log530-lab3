// @flow
import {combineReducers} from 'redux';
import {combineEpics} from 'redux-observable';

import configureStore from './CreateStore';
import {Member, Card} from '../Models';

import {
  isFetching,
  members,
  cards
} from './Reducers';
import {
  searchEpic
} from './Actions';

export type ReduxStateType = {
  isFetching: boolean,
  nav: Object,
  members: Member[],
  cards: Card[]
};

export default (navigationReducer: Object) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: navigationReducer,
    isFetching,
    members,
    cards
  });

  /* ------------- Assemble The Epics ------------- */
  const rootEpic = combineEpics(
    searchEpic
  );

  return configureStore(rootReducer, rootEpic);
};
