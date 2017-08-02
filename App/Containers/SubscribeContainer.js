// @flow
import React, { Component } from 'react';  // eslint-disable-line
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux';

import {SubscribeComponent} from '../Components';

class SubscribeContainer extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <SubscribeComponent />
      </View>
    );
  }
}
export default connect()(SubscribeContainer);
