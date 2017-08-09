// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {NavigationScreenProp} from 'react-navigation';

import {SingleCardComponent} from '../Components';
import {Card} from '../Models';

export default class SingleCardContainer extends Component {
  static navigationOptions = ({navigation}: {navigation: NavigationScreenProp}) => {
    const card: Card = navigation.state.params.card;

    return {
      title: card.joueur.prenom + ' ' + card.joueur.nom
    };
  };

  render() {
    const {card} = this.props.navigation.state.params;

    return <SingleCardComponent card={card} />;
  }
}
