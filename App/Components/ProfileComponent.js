// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {View, Text} from 'react-native';

export default class ProfileComponent extends Component {
  render() {
    return (
      <View>
        <Text>Profile component</Text>
        <Text>{this.props.member.prenom}</Text>
        <Text>{this.props.member.nom}</Text>
        <Text>{this.props.member}</Text>
        <Text>{this.props.member}</Text>
        <Text>{this.props.member}</Text>
        <Text>{this.props.member}</Text>
        <Text>{this.props.member}</Text>
      </View>
    );
  }
}
