// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  AppRegistry,
  Platform
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import {CardsContainer} from '.';
import {iconsLoaded} from '../Themes';

/**
 * First component of the application. Initalization of Redux and such go here.
 *
 * @class HobbyCartes
 * @extends {Component}
 */
// class HobbyCartes extends Component {
//   render() {
//     return <CardsContainer />;
//   }
// }

// Navigation is done here
let navigator;

if (Platform.OS === 'ios') {
  navigator = StackNavigator({
    Home: {screen: CardsContainer}
  });
} else {  // Android
  navigator = StackNavigator();
}

/**
 * Class that serves as a wrapper. This is useful for testing because tests will
 * fail if AppRegistry.registerComponent() is called.
 *
 * @class Runner
 */
class Runner {
  constructor() {
    iconsLoaded.then(() => AppRegistry.registerComponent('HobbyCartes', () => navigator));
  }
}

let App;

if (global.__TEST__) {  // __TEST__ is defined in package.json
  App = navigator;
} else {
  App = Runner;
}

export default App;
