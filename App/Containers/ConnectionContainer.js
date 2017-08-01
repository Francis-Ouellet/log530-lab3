// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  View,
  StatusBar
} from 'react-native';
import {connect} from 'react-redux';

import {ConnectionComponent} from '../Components';

class ConnectionContainer extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <ConnectionComponent />
      </View>
    );
  }
}
export default connect()(ConnectionContainer);
