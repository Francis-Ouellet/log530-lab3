// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  View,
  ScrollView
} from 'react-native';

import {SubscribeComponentStyle} from './Styles';
import {
  BigRedButton,
  BigRedTitle,
  HobbyTextInput
} from '.';

export default class SubscribeComponent extends Component {
    render() {
        return (
          <ScrollView
            alwaysBounceVertical={false}
            style={SubscribeComponentStyle.baseScrollView}>
            <View style={SubscribeComponentStyle.baseView}>
              <View style={{height: 30}} />
              <BigRedTitle>HobbyCartes</BigRedTitle>
              <HobbyTextInput
                returnKeyType="next"
                placeholder="Prénom"
                autoFocus={true}
                autoCorrect={false}
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                placeholder="Nom"
                autoCorrect={false}
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                autoCorrect={false}
                placeholder="Ville"
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                placeholder="Code postal"
                autoCorrect={false}
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                placeholder="Courriel"
                autoCorrect={false}
                autoCapitalize={false}
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                placeholder="Nom d'utilisateur"
                autoCorrect={false}
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                placeholder="Mot de passe"
                secureTextEntry={true}
                style={{marginTop: 10}} />
              <BigRedButton
                style={{marginTop: 10}}
                onPress={() => {}} >
                Go !
              </BigRedButton>
            </View>
          </ScrollView>
        );
    }
}
