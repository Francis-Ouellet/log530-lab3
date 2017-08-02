// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {NavigationScreenProp, NavigationActions} from 'react-navigation';

import {SubscribeComponent} from '../Components';
import {subscribe} from '../Redux/Actions';
import {Member} from '../Models';

import type {ReduxStateType} from '../Redux';

type PropsType = {
  isLoggedIn: boolean,
  subscribe: Function,
  navigation: NavigationScreenProp
};

class SubscribeContainer extends Component {
  props: PropsType;

  componentWillReceiveProps(newProps: PropsType) {
    if (newProps.isLoggedIn) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Cards'})
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <SubscribeComponent onSubscribePress={(
          firstName: string,
          lastName: string,
          city: String,
          postalCode: string,
          email: string,
          username: string,
          password: string
        ) => this.props.subscribe(firstName, lastName, city, postalCode, email, username, password)} />
      </View>
    );
  }
}
export default connect(
  (state: ReduxStateType) => ({
    isLoggedIn: state.currentMember instanceof Member
  }),
  (dispatch: Function) => ({
    subscribe: (
      firstName: string,
      lastName: string,
      city: string,
      postalCode: string,
      email: string,
      username: string,
      password: string
    ) => dispatch(subscribe(firstName, lastName, city, postalCode, email, username, password))
  })
)(SubscribeContainer);
