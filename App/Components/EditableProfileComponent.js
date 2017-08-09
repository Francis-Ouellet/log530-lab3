// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Member} from '../Models';
import PropTypes from 'prop-types';
import {ProfileComponentStyle} from './Styles';

type PropsType = {
    member: Member
  };

export default class EditableProfileComponent extends Component {
  props: PropsType;

  constructor(props: PropsType) {
    super(props);
  }

  static PropsType = {
    member: PropTypes.instanceOf(Member).isRequired
  };

  shouldComponentUpdate(newProps: PropsType, newState: StateType) {
      return newProps.member !== this.props.member
    }

  render() {
    const {member} = this.props;
    return (
      <View>
        <Text>Edit Profile</Text>
        <TextInput placeholder={this.props.member.prenom}></TextInput>
        <TextInput placeholder= {this.props.member.nom} />
        <TextInput>{this.props.member.nomUtilisateur}</TextInput>
        <TextInput>{this.props.member.courriel}</TextInput>
        <TextInput>{this.props.member.postalCode}</TextInput>
        <TouchableOpacity Onpress={this.Edit} style={ProfileComponentStyle.buttonContainer}>
          <Text style={ProfileComponentStyle.buttonText}>EDITER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
