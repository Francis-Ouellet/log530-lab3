// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import {NavigationNavigator} from 'react-navigation';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import {CardsComponent} from '../Components';
import {CardsContainerStyle} from './Styles';
import {Colors} from '../Themes';

export default class CardsContainer extends Component {
  static navigationOptions = ({navigation}: {navigation: NavigationNavigator}) => {
    return {
      title: 'Fil des cartes',
      headerLeft: (
        <TouchableOpacity style={CardsContainerStyle.profileButton} onPress={() => {}}>
          <FAIcon name="user-circle-o" size={25} color={Colors.snow} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity style={CardsContainerStyle.searchButton} onPress={() => {}}>
          <FAIcon name="search" size={25} color={Colors.snow} />
        </TouchableOpacity>
      ),
      headerStyle: CardsContainerStyle.header,
      headerTitleStyle: CardsContainerStyle.headerTitle
    };
  };

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <CardsComponent />
      </View>
    );
  }
}
