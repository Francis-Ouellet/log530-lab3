// @flow
import {combineReducers} from 'redux';

import configureStore from './CreateStore';

import {
  isFetching
} from './Reducers';

export type ReduxStateType = {
  isFetching: boolean,
  nav: Object
};

export default (navigationReducer: Object) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: navigationReducer,
    isFetching
  });

  return configureStore(rootReducer);
};
