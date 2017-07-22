// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  TouchableOpacity,
  Button,
  AppRegistry,
  Platform,
  StyleSheet
} from 'react-native';
import {StackNavigator, NavigationNavigator} from 'react-navigation';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import {
  CardsContainer,
  SearchContainer
} from '.';
import {iconsLoaded, Colors} from '../Themes';

const NavigationStyle = StyleSheet.create({
  profileButton: {
    marginLeft: 10
  },
  searchButton: {
    marginRight: 10
  },
  header: {
    backgroundColor: Colors.hobbyRed
  },
  headerTitle: {
    color: Colors.snow
  }
});
const TITLES = {
  cards: 'Fil des cartes',
  search: 'Recherche',
  close: 'Fermer'
};

function CloseButton(props: Object) {
  return <Button color={Colors.snow} onPress={() => props.navigation.goBack()} title={TITLES.close} />;
}

// Navigation is done here
let navigator;

if (Platform.OS === 'ios') {
  navigator = StackNavigator({
    Cards: {
      screen: CardsContainer,
      navigationOptions: ({navigation}: {navigation: NavigationNavigator}) => {
        return {
          title: TITLES.cards,
          headerLeft: (
            <TouchableOpacity style={NavigationStyle.profileButton} onPress={() => {}}>
              <FAIcon name="user-circle-o" size={25} color={Colors.snow} />
            </TouchableOpacity>
          ),
          headerRight: (
            <TouchableOpacity style={NavigationStyle.searchButton} onPress={() => navigation.navigate('Search')}>
              <FAIcon name="search" size={25} color={Colors.snow} />
            </TouchableOpacity>
          ),
          headerBackTitle: null
        };
      }
    },
    Search: {
      screen: SearchContainer,
      navigationOptions: ({navigation}: {navigation: NavigationNavigator}) => {
        return {
          title: TITLES.search,
          headerLeft: <CloseButton navigation={navigation} />
        };
      }
    }
  }, {
    navigationOptions: {
      headerStyle: NavigationStyle.header,
      headerTitleStyle: NavigationStyle.headerTitle,
      headerTintColor: Colors.snow
    },
    mode: 'modal'
  });
} else {  // Android
  navigator = StackNavigator();
}

/**
 * Class that serves as a wrapper. This is useful for testing because tests will
 * fail if AppRegistry.registerComponent() is called.
 *
 * @class Runner
 */
class Runner {
  constructor() {
    iconsLoaded.then(() => AppRegistry.registerComponent('HobbyCartes', () => navigator));
  }
}

let App;

if (global.__TEST__) {  // __TEST__ is defined in package.json
  App = navigator;
} else {
  App = Runner;
}

export default App;
