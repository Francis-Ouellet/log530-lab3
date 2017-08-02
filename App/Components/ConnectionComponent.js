// @flow
import React, {Component} from 'react';  // eslint-disable-line
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import {ConnectionComponentStyle} from './Styles';
import {
  BigRedTitle,
  HobbyTextInput,
  BigRedButton
} from '.';

type PropsType = {
  onLoginPress: Function,
  onSubscribePress: Function
};

type StateType = {
  usernameOrEmail: string,
  password: string
};

export default class ConnectionComponent extends Component {
  props: PropsType;
  state: StateType;

  static propTypes = {
    onLoginPress: PropTypes.func.isRequired,
    onSubscribePress: PropTypes.func.isRequired
  };

  constructor(props: PropsType) {
    super(props);

    this.state = {
      usernameOrEmail: '',
      password: ''
    };
  }

  render() {
    return (
      <View style={ConnectionComponentStyle.baseView}>
        <BigRedTitle>HobbyCartes</BigRedTitle>
        <HobbyTextInput
          style={{marginTop: 10}}
          returnKeyType="next"
          placeholder="courriel ou nom d'utilisateur"
          onChangeText={(text: string) => this.setState({usernameOrEmail: text})}
          autoFocus={true}
          autoCorrect={false}
          autoCapitalize="none" />
        <HobbyTextInput
          returnKeyType="send"
          placeholder="mot de passe"
          onChangeText={(text: string) => this.setState({password: text})}
          secureTextEntry={true}
          style={{marginTop: 10}} />
        <BigRedButton
          onPress={() => this.props.onLoginPress(this.state.usernameOrEmail, this.state.password)}
          title="Go !"
          style={{marginTop: 10}}>
          Go !
        </BigRedButton>
        <View style={ConnectionComponentStyle.subscribeView}>
          <Text>Pas de compte? </Text>
          <TouchableOpacity onPress={this.props.onSubscribePress}>
            <Text style={ConnectionComponentStyle.subscribeText}>Inscrivez-vous</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 50}} />
      </View>
    );
  }
}
