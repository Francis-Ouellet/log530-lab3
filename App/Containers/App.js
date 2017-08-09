// @flow
// import {Navigation} from 'react-native-navigation';
import React, {Component} from 'react';  // eslint-disable-line
import {
  AppRegistry,
  Platform,
} from 'react-native';
import {addNavigationHelpers} from 'react-navigation';
import {connect, Provider} from 'react-redux';

import applyConfigSettings from '../Config';
import createStore from '../Redux';
import {BaseNavigatorIOS, BaseNavigatorAndroid} from './Navigation';

// Apply app settings
applyConfigSettings();

const RootNavigator = Platform.OS === 'ios' ? BaseNavigatorIOS : BaseNavigatorAndroid;

function navigationReducer(state: Object, action: Object) {
  const newState = RootNavigator.router.getStateForAction(action, state);
  return newState || state;
}

// create the Redux store
const [store] = createStore(navigationReducer);
export {store};

class RootContainer extends Component {
  render() {
    return (
      <RootNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav
      })} />
    );
  }
}
RootContainer = connect((state: Object) => ({
  nav: state.nav
}))(RootContainer);

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

/**
 * Class that serves as a wrapper. This is useful for testing because tests will
 * fail if AppRegistry.registerComponent() is called.
 *
 * @class Runner
 */
class Runner {
  constructor() {
    AppRegistry.registerComponent('HobbyCartes', () => AppContainer);
  }
}

let App;

if (global.__TEST__) {  // __TEST__ is defined in package.json
  App = AppContainer;
} else {
  App = Runner;
}

export default App;
