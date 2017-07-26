// @flow
import {combineReducers} from 'redux';
import {combineEpics} from 'redux-observable';

import configureStore from './CreateStore';
import {Member} from '../Models';

import {
  isFetching,
  members,
  showMember,
  editMember
} from './Reducers';

import {
  searchEpic
} from './Actions';

export type ReduxStateType = {
  isFetching: boolean,
  nav: Object,
  members: Member[],
  actualMember: Member
};

export default (navigationReducer: Object) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: navigationReducer,
    isFetching,
    members,
    actualMember: showMember
  });

  const rootEpic = combineEpics(
    searchEpic
  );

  return configureStore(rootReducer, rootEpic);
};
