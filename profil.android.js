import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text } from 'react-native';

class Profil extends Component {
  render() {
    return (
      <View>
        <Text>Prénom</Text>

        </View>
        <View>
        <Text>Nom</Text>
        <Text>Adresse courrielle</Text>
        <Text>Mot de passe</Text>
        <Button
          onPress={this._onPressButton}
          title="Modifier les informations"
          color="#841584"
        />
      </View>
    )
  }
}
