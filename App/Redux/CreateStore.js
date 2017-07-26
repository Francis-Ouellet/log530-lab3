// @flow
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import Config from '../Config/DebugSettings';

// creates the store
export default (rootReducer: any, rootEpic: any) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Logger Middleware ------------- */

  if (__DEV__) {
    // the logger master switch
    const USE_LOGGING = Config.reduxLogging;
    // silence these saga-based messages
    // create the logger
    const logger = createLogger({
      predicate: () => USE_LOGGING
    });
    middleware.push(logger);
  }

  /* ------------- Redux Observable ------------- */

  const epicMiddleware = createEpicMiddleware(rootEpic);
  middleware.push(epicMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  // in dev mode, we'll create the store through Reactotron
  const createAppropriateStore = __DEV__ ? console.tron.createStore : createStore;  // eslint-disable-line
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  return [store];
};
