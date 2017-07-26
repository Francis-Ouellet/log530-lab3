// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  View,
  StatusBar
} from 'react-native';

import {CardsComponent} from '../Components';

export default class CardsContainer extends Component {
  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <CardsComponent />
      </View>
    );
  }
}
