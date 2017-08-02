// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  View,
  StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import {Member} from '../Models';
import type {ReduxStateType} from '../Redux';
import {EditableProfileComponent} from '../Components';

type PropsType = {
    member: Member
  };

class EditableProfileContainer extends Component {
  props: PropsType;
  constructor(props: PropsType) {
      super(props);
    }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <EditableProfileComponent/>
      </View>
    );
  }
}

export default connect((state: Object) => ({
  member: state.actualMember
}))(EditableProfileContainer);
