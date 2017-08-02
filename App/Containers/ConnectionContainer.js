// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  View,
  StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';

import {ConnectionComponent} from '../Components';
import {login} from '../Redux/Actions';
import {Member} from '../Models';

import type {ReduxStateType} from '../Redux';

declare function LoginFunc(usernameOrEmail: string, password: string): void;

type PropsType = {
  login: LoginFunc,
  isLoggedIn: boolean,
  navigation: NavigationScreenProp
};

class ConnectionContainer extends Component {
  props: PropsType;

  componentWillReceiveProps(nextProps: PropsType) {
    if (nextProps.isLoggedIn) {
      this.props.navigation.goBack(null);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <ConnectionComponent
          onLoginPress={
            (usernameOrEmail: string, password: string) => this.props.login(usernameOrEmail, password)
          }
          onSubscribePress={() => {}} />
      </View>
    );
  }
}
export default connect(
  (state: ReduxStateType) => ({
    isLoggedIn: state.currentMember instanceof Member
  }),
  (dispatch: Function) => ({
    login: (usernameOrEmail: string, password: string) => dispatch(login(usernameOrEmail, password))
  })
)(ConnectionContainer);
