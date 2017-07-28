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

import type {ReduxStateType} from '../Redux';

declare function searchMembersAndCards(term: string): any;

type PropsType = {
  navigation: NavigationProp,
  searchMembersAndCards: searchMembersAndCards,
  members: $PropertyType<ReduxStateType, 'members'>
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
        <SearchComponent members={this.props.members} />
      </View>
    );
  }
}
export default connect(
  (state: ReduxStateType) => ({
    members: state.members
  }),
  (dispatch: Function, ownProps: PropsType) => ({
    searchMembersAndCards: (term: string) => dispatch(search(term))
  })
)(SearchContainer);
