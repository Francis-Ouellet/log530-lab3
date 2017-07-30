// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {
  View,
  StatusBar
} from 'react-native';
import {NavigationProp} from 'react-navigation';
import {connect} from 'react-redux';

import {SearchComponent} from '../Components';
import {search} from '../Redux/Actions';
import {Card} from '../Models';

import type {ReduxStateType} from '../Redux';

declare function searchMembersAndCards(term: string): any;

type PropsType = {
  navigation: NavigationProp,
  searchMembersAndCards: searchMembersAndCards,
  members: $PropertyType<ReduxStateType, 'members'>,
  cards: $PropertyType<ReduxStateType, 'cards'>
};

type StateType = {
  currentTerm: string
};

class SearchContainer extends Component {
  props: PropsType;
  state: StateType;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      currentTerm: ''
    };
  }

  componentWillReceiveProps(newProps: PropsType) {
    const navigationParams = newProps.navigation.state.params || {};
    const searchText = navigationParams.searchText;

    if (searchText && searchText !== this.state.currentTerm) {
      this.setState({
        currentTerm: searchText
      });
      this.props.searchMembersAndCards(searchText);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <SearchComponent
          onCardItemPress={(card: Card) => this.props.navigation.navigate('SingleCard', {card})}
          members={this.props.members}
          cards={this.props.cards} />
      </View>
    );
  }
}
export default connect(
  (state: ReduxStateType) => ({
    members: state.members,
    cards: state.cards
  }),
  (dispatch: Function, ownProps: PropsType) => ({
    searchMembersAndCards: (term: string) => dispatch(search(term))
  })
)(SearchContainer);
