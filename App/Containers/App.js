// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import {StackNavigator} from 'react-navigation';

class HobbyCartes extends Component {
  static navigationOptions = {
    title: 'Fil des cartes'
  };

  render() {
    return (
      <View>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

// Navigation is done here
let navigator;

if (Platform.OS === 'ios') {
  navigator = StackNavigator({
    Home: {screen: HobbyCartes}
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
    AppRegistry.registerComponent('HobbyCartes', () => navigator);
  }
}

let App;

if (global.__TEST__) {  // __TEST__ is defined in package.json
  App = navigator;
} else {
  App = Runner;
}

export default App;
