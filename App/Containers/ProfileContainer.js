// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {NavigationScreenProp} from 'react-navigation';
import {
  View,
  StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import {Member} from '../Models';
import type {ReduxStateType} from '../Redux';
import {ProfileComponent} from '../Components';

type PropsType = {
    member: Member
  };

class ProfileContainer extends Component {
  props: PropsType;
  constructor(props: PropsType) {
      super(props);
    }

  render() {
    const {member} = this.props.navigation.state.params;
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <ProfileComponent  member={this.props.navigation.state.params.member}/>
      </View>
    );
  }
}

export default connect((state: Object) => ({
  member: state.currentMember
}))(ProfileContainer);
