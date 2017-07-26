// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  TouchableOpacity,
  Button,
  AppRegistry,
  Platform,
  StyleSheet
} from 'react-native';
import {StackNavigator, NavigationNavigator, addNavigationHelpers} from 'react-navigation';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {connect, Provider} from 'react-redux';

import applyConfigSettings from '../Config';
import createStore from '../Redux';
import {
  CardsContainer,
  SearchContainer
} from '.';
import {Colors} from '../Themes';

// Apply app settings
applyConfigSettings();

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
let RootNavigator;

if (Platform.OS === 'ios') {
  RootNavigator = StackNavigator({
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
  RootNavigator = StackNavigator();
}

function navigationReducer(state: Object, action: Object) {
  const newState = RootNavigator.router.getStateForAction(action, state);
  return newState || state;
}

// create the Redux store
const [store] = createStore(navigationReducer);
export {store};

class RootContainer extends Component {
  render() {
    return (
      <RootNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav
      })} />
    );
  }
}
RootContainer = connect((state: Object) => ({
  nav: state.nav
}))(RootContainer);

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

/**
 * Class that serves as a wrapper. This is useful for testing because tests will
 * fail if AppRegistry.registerComponent() is called.
 *
 * @class Runner
 */
class Runner {
  constructor() {
    AppRegistry.registerComponent('HobbyCartes', () => AppContainer);
  }
}

let App;

if (global.__TEST__) {  // __TEST__ is defined in package.json
  App = AppContainer;
} else {
  App = Runner;
}

export default App;
