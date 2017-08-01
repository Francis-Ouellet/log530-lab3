// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  View
} from 'react-native';

import {ConnectionComponentStyle} from './Styles';
import {
  BigRedTitle,
  HobbyTextInput,
  BigRedButton
} from '.';

export default class ConnectionComponent extends Component {
  render() {
    return (
      <View style={ConnectionComponentStyle.baseView}>
        <BigRedTitle>HobbyCartes</BigRedTitle>
        <HobbyTextInput
          style={{marginTop: 10}}
          returnKeyType="next"
          placeholder="courriel ou nom d'utilisateur"
          autoFocus={true}
          autoCorrect={false}
          autoCapitalize="none" />
        <HobbyTextInput
          returnKeyType="send"
          placeholder="mot de passe"
          secureTextEntry={true}
          style={{marginTop: 10}} />
        <BigRedButton
          onPress={() => {}}
          title="Go !"
          style={{marginTop: 10}}>
          Go !
        </BigRedButton>
        <View style={{height: 50}} />
      </View>
    );
  }
}
