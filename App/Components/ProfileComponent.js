// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {View, Text} from 'react-native';
import {Member} from '../Models';
import PropTypes from 'prop-types';

type PropsType = {
    member: Member
  };

export default class ProfileComponent extends Component {
  props: PropsType;

  static PropsType = {
    member: PropTypes.instanceOf(Member).isRequired
  };

  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Profile component</Text>
        <Text>{this.props.member.idMembre}</Text>
        <Text>{this.props.member.prenom} {this.props.member.nom}</Text>
        <Text>{this.props.member.nomUtilisateur}</Text>
        <Text>{this.props.member.motDePasse}</Text>
        <Text>{this.props.member.courriel}</Text>
        <Text>{this.props.member.dateInscription}</Text>
        <Text>{this.props.member.postalCode}</Text>
      </View>
    );
  }
}
