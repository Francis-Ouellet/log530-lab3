// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  View,
  StatusBar
} from 'react-native';

import {SearchComponent} from '../Components';

export default class SearchContainer extends Component {
  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <SearchComponent />
      </View>
    );
  }
}
