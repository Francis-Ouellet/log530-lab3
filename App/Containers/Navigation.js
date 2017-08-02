// @flow
import React from 'react';  // eslint-disable-line
import {
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Image
} from 'react-native';
import {
  StackNavigator,
  NavigationScreenProp,
  TabNavigator
} from 'react-navigation';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import {
  CardsContainer,
  SearchContainer,
  SingleCardContainer,
  ConnectionContainer,
  ProfileContainer,
  EditProfileContainer
} from '.';
import {Colors} from '../Themes';
import {Collection} from '../Models';

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
  },
  blankHeaderStyle: {
    backgroundColor: Colors.transparent
  }
});
const TITLES = {
  cards: 'Fil des cartes',
  search: 'Recherche',
  close: 'Fermer',
  profil: 'Profile'
};
export const TAB_NAMES = {
  hockey: 'Hockey',
  football: 'Football',
  baseball: 'Baseball',
  basketball: 'Basketball'
};

const SearchNavigator = StackNavigator({
  Search: {
    screen: SearchContainer,
    navigationOptions: ({navigation}: {navigation: NavigationScreenProp}) => ({
      headerTitle: <TextInput
                    onChangeText={(text: string) => navigation.setParams({searchText: text})}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="search"
                    selectTextOnFocus={true}
                    style={NavigationStyle.searchTextInput}
                    placeholder="Rechercher" />,
      headerLeft: <CloseButton onPress={() => navigation.goBack(null)} />,
      headerBackTitle: 'Recherche',
      tabBarVisible: false
    })
  }
}, {
  navigationOptions: {
    headerStyle: NavigationStyle.header,
    headerTitleStyle: NavigationStyle.headerTitle,
    headerTintColor: Colors.snow
  },
  headerMode: 'screen'
});

const ProfileNavigator = StackNavigator({
  Profile: {
    screen: ProfileContainer,
    navigationOptions: ({navigation}: {navigation: NavigationScreenProp}) => ({
      headerTitle: TITLES.profil,
      headerLeft: <CloseButton onPress={() => navigation.goBack(null)} />,
      headerRight: <TouchableOpacity style={NavigationStyle.profileButton} onPress={() => navigation.goBack(null)/* => props.navigation.navigate('EditProfile')*/} />,
      headerBackTitle: 'Profile',
      tabBarVisible: false
      })
  },
  /*EditProfile: {
        screen: EditProfileNavigator,
        navigationOptions: {
          header: null
        }
      }*/
  },
  {
    navigationOptions: {
      headerStyle: NavigationStyle.header,
      headerTitleStyle: NavigationStyle.headerTitle,
      headerTintColor: Colors.snow
    },
    headerMode: 'screen'
  });

  const EditProfileNavigator = StackNavigator({
    EditProfile: {
      screen: EditProfileContainer,
      navigationOptions: ({navigation}: {navigation: NavigationScreenProp}) => ({
        headerTitle: TITLES.profil,
        headerLeft: <CloseButton onPress={() => navigation.goBack(null)} />,
        headerBackTitle: 'EditProfile',
        tabBarVisible: false
        })
      }
    },
    {
      navigationOptions: {
        headerStyle: NavigationStyle.header,
        headerTitleStyle: NavigationStyle.headerTitle,
        headerTintColor: Colors.snow
      },
      headerMode: 'screen'
    });

const CardsNavigator = StackNavigator({
  Cards: {
    screen: CardsContainer,
    navigationOptions: (props: Object) => {
      return {
        title: TITLES.cards,
        headerLeft: (
          <TouchableOpacity style={NavigationStyle.profileButton} onPress={() => props.navigation.navigate('Login')}>
            <FAIcon name="user-circle-o" size={25} color={Colors.snow} />
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity style={NavigationStyle.searchButton} onPress={() => props.navigation.navigate('Search')}>
            <FAIcon name="search" size={25} color={Colors.snow} />
          </TouchableOpacity>
        ),
        headerBackTitle: 'Fiches'
      };
    }
  },
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: ConnectionContainer,
    navigationOptions: (props: Object) => ({
      headerTitle: null,
      headerStyle: NavigationStyle.blankHeaderStyle,
      headerLeft: (
        <TouchableOpacity style={{marginLeft: 10}} onPress={() => props.navigation.goBack(null)}>
          <FAIcon name="times-circle" size={40} color="black" />
        </TouchableOpacity>
      ),
      tabBarVisible: false
    })
  },
  Profil: {
      screen: ProfileNavigator,
      navigationOptions: {
        header: null
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

const CardsTabNavigator = TabNavigator({
  [TAB_NAMES.hockey]: {
    screen: CardsNavigator,
    navigationOptions: ({navigation}: {navigation: NavigationScreenProp}) => ({
      tabBarLabel: TAB_NAMES.hockey,
      tabBarIcon: <Image source={require('../Resources/hockey.png')} style={{width: 25, height: 25}} />
    })
  },
  [TAB_NAMES.football]: {
    screen: CardsNavigator,
    navigationOptions: ({navigation}: {navigation: NavigationScreenProp}) => ({
      tabBarLabel: TAB_NAMES.football,
      tabBarIcon: <Image source={require('../Resources/american-football.png')} style={{width: 25, height: 25}} />
    })
  },
  [TAB_NAMES.baseball]: {
    screen: CardsNavigator,
    navigationOptions: ({navigation}: {navigation: NavigationScreenProp}) => ({
      tabBarLabel: TAB_NAMES.baseball,
      tabBarIcon: <Image source={require('../Resources/baseball.png')} style={{width: 25, height: 25}} />
    })
  },
  [TAB_NAMES.basketball]: {
    screen: CardsNavigator,
    navigationOptions: ({navigation}: {navigation: NavigationScreenProp}) => ({
      tabBarLabel: TAB_NAMES.basketball,
      tabBarIcon: <Image source={require('../Resources/basketball.png')} style={{width: 25, height: 25}} />
    })
  }
}, {
  tabBarOptions: {
    activeBackgroundColor: Colors.drawer,
    inactiveBackgroundColor: Colors.drawer
  }
});

const BaseNavigatorIOS = StackNavigator({
  Tabs: {
    screen: CardsTabNavigator,
    navigationOptions: {
      header: null
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

const BaseNavigatorAndroid = BaseNavigatorIOS;

export {
  BaseNavigatorIOS,
  BaseNavigatorAndroid
};
