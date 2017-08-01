// @flow
import React, {Component} from 'react';  // eslint-disable-line
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

import {Member} from '../Models';
import {MemberComponentStyle} from './Styles';

type PropsType = {
  member: Member
};

export default class MemberComponent extends Component {
  props: PropsType;

  static propTypes = {
    member: PropTypes.instanceOf(Member).isRequired
  };

  render() {
    return (
      <ScrollView style={MemberComponentStyle.scrollView}>
        <View style={MemberComponentStyle.imageView}></View>
      </ScrollView>
    );
  }
}
