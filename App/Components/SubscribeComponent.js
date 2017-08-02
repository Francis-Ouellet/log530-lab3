// @flow
import React, {Component} from 'react';  // eslint-disable-line
import PropTypes from 'prop-types';
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

type PropsType = {
  onSubscribePress: Function
};

type StateType = {
  firstNameText: string,
  lastNameText: string,
  cityText: string,
  postalCodeText: string,
  emailText: string,
  usernameText: string,
  passwordText: string
};

export default class SubscribeComponent extends Component {
  props: PropsType;
  state: StateType;

  static propTypes = {
    onSubscribePress: PropTypes.func.isRequired
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      firstNameText: '',
      lastNameText: '',
      cityText: '',
      postalCodeText: '',
      emailText: '',
      usernameText: '',
      passwordText: ''
    };
  }

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
                onChangeText={(text: string) => this.setState({firstNameText: text})}
                autoFocus={true}
                autoCorrect={false}
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                placeholder="Nom"
                onChangeText={(text: string) => this.setState({lastNameText: text})}
                autoCorrect={false}
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                autoCorrect={false}
                onChangeText={(text: string) => this.setState({cityText: text})}
                placeholder="Ville"
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                placeholder="Code postal"
                onChangeText={(text: string) => this.setState({postalCodeText: text})}
                autoCorrect={false}
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                placeholder="Courriel"
                onChangeText={(text: string) => this.setState({emailText: text})}
                autoCorrect={false}
                autoCapitalize={false}
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="next"
                placeholder="Nom d'utilisateur"
                onChangeText={(text: string) => this.setState({usernameText: text})}
                autoCorrect={false}
                style={{marginTop: 10}} />
              <HobbyTextInput
                returnKeyType="send"
                placeholder="Mot de passe"
                onChangeText={(text: string) => this.setState({passwordText: text})}
                secureTextEntry={true}
                style={{marginTop: 10}} />
              <BigRedButton
                style={{marginTop: 10}}
                onPress={() => this.props.onSubscribePress(
                  this.state.firstNameText,
                  this.state.lastNameText,
                  this.state.cityText,
                  this.state.postalCodeText,
                  this.state.emailText,
                  this.state.usernameText,
                  this.state.passwordText
                )} >
                Go !
              </BigRedButton>
            </View>
          </ScrollView>
        );
    }
}
