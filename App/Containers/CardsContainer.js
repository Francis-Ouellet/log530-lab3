// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {CardsComponent} from '../Components';

export default class CardsContainer extends Component {
  static navigationOptions = {
    title: 'Fil des cartes'
  };

  render() {
    return <CardsComponent/>;
  }
}
