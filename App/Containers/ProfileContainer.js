// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  View,
  StatusBar
} from 'react-native';
import {connect} from 'react-redux';

import {ProfilComponent} from '../Components';

class ProfileContainer extends Component {
  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <ProfileComponent  member={this.props.member}/>
      </View>
    );
  }
}

export default connect((state: Object) => ({
  member: state.actualMember
}))(ProfileContainer);
