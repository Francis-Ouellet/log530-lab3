// @flow
// import {Navigation} from 'react-native-navigation';
import React, {Component} from 'react';  // eslint-disable-line
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

class HobbyCartes extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.{Platform.OS}.js
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class Runner {
  constructor() {
    AppRegistry.registerComponent('HobbyCartes', () => HobbyCartes);
  }
}

let App;

if (global.__TEST__) {
  App = HobbyCartes;
} else {
  App = Runner;
}

export default App;
