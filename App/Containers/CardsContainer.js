// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  View,
  StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';

import {CardsComponent} from '../Components';
import {getCardsByCategory} from '../Redux/Actions';
import {Card} from '../Models';

import type {ReduxStateType} from '../Redux';

declare function GetCardsByCategoryFunc(category: string): void;

type PropsType = {
  cards: Card[],
  getCardsByCategory: GetCardsByCategoryFunc,
  navigation: NavigationScreenProp,
  currentCategory: string,
  isFetching: boolean
};

class CardsContainer extends Component {
  props: PropsType;
  _onListRefresh: Function;
  _onCardPress: Function;

  constructor(props: PropsType) {
    super(props);

    this._onListRefresh = this._onListRefresh.bind(this);
    this._onCardPress = this._onCardPress.bind(this);
  }

  componentWillMount() {
    this.props.getCardsByCategory(this.props.currentCategory);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <CardsComponent
          onItemPress={this._onCardPress}
          onRefresh={this._onListRefresh}
          refreshing={this.props.isFetching}
          cards={this.props.cards} />
      </View>
    );
  }

  _onListRefresh() {
    this.props.getCardsByCategory(this.props.currentCategory);
  }

  _onCardPress(card: Card) {
    this.props.navigation.navigate('SingleCard', {card});
  }
}
export default connect(
  (state: ReduxStateType, ownProps: PropsType) => {
    const tabRoutes = state.nav.routes[0].routes;
    const currentCategory: string = tabRoutes.reduce((acc: Object, currentRoute: Object) => {
      if (acc.routeName && acc.routes[0].key === ownProps.navigation.state.key) {
        return acc.routeName.toLowerCase();
      }

      if (currentRoute.routes[0].key === ownProps.navigation.state.key) {
        return currentRoute.routeName.toLowerCase();
      }

      return acc;
    });

    return {
      cards: state.cards[currentCategory],
      currentCategory: currentCategory.toUpperCase(),
      isFetching: state.isFetching
    };
  },
  (dispatch: Function, ownProps: PropsType) => ({
    getCardsByCategory: (category: string) => dispatch(getCardsByCategory(category))
  })
)(CardsContainer);
