// @flow
import React from 'react';  // eslint-disable-line
import {
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import {StackNavigator, NavigationNavigator} from 'react-navigation';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import {
  CardsContainer,
  SearchContainer,
  SingleCardContainer
} from '.';
import {Colors} from '../Themes';

function CloseButton(props: Object) {
  return <Button color={Colors.snow} onPress={props.onPress} title={TITLES.close} />;
}

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
  },
  searchTextInput: {
    backgroundColor: Colors.ember,
    padding: 5,
    height: 30,
    width: 200,
    borderRadius: 7,
    textAlign: 'center'
  }
});
const TITLES = {
  cards: 'Fil des cartes',
  search: 'Recherche',
  close: 'Fermer'
};

// iOS
const SearchNavigator = StackNavigator({
  Search: {
    screen: SearchContainer,
    navigationOptions: ({navigation}: {navigation: NavigationNavigator}) => {
      return {
        headerTitle: <TextInput
                      onChangeText={(text: string) => navigation.setParams({searchText: text})}
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType="search"
                      selectTextOnFocus={true}
                      style={NavigationStyle.searchTextInput}
                      placeholder="Rechercher" />,
        headerLeft: <CloseButton onPress={() => navigation.goBack(null)} />
      };
    }
  },
  SingleCard: {
    screen: SingleCardContainer
  }
}, {
  navigationOptions: {
    headerStyle: NavigationStyle.header,
    headerTitleStyle: NavigationStyle.headerTitle,
    headerTintColor: Colors.snow
  },
  headerMode: 'screen'
});

const BaseNavigatorIOS = StackNavigator({
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
    screen: SearchNavigator,
    navigationOptions: ({navigation}: {navigation: NavigationNavigator}) => {
      return {
        header: null
      };
    }
  }
}, {
  navigationOptions: {
    headerStyle: NavigationStyle.header,
    headerTitleStyle: NavigationStyle.headerTitle,
    headerTintColor: Colors.snow
  },
  mode: 'modal',
  headerMode: 'screen'
});

export {
  BaseNavigatorIOS
};
