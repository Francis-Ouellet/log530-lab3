// @flow
import {combineReducers} from 'redux';
import {combineEpics} from 'redux-observable';

import configureStore from './CreateStore';
import {Member} from '../Models';

import {
  isFetching,
  members
} from './Reducers';

import {
  searchEpic
} from './Actions';

export type ReduxStateType = {
  isFetching: boolean,
  nav: Object,
  members: Member[]
};

export default (navigationReducer: Object) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: navigationReducer,
    isFetching,
    members
  });

  const rootEpic = combineEpics(
    searchEpic
  );

  return configureStore(rootReducer, rootEpic);
};
