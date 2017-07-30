// @flow
import React, {Component} from 'react';  // eslint-disable-line
import PropTypes from 'prop-types';
import {
  FlatList,
  TouchableOpacity
} from 'react-native';

import {Card} from '../Models';
import {DataListItem} from '../Components';

type PropsType = {
  cards: Card[],
  onRefresh: Function,
  refreshing: boolean,
  onItemPress: Function
};

export default class CardsComponent extends Component {
  props: PropsType;
  _renderItem: Function;
  _extractKey: Function;

  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.instanceOf(Card)).isRequired,
    onRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    onItemPress: PropTypes.func
  };

  constructor(props: PropsType) {
    super(props);

    this._renderItem = this._renderItem.bind(this);
    this._extractKey = this._extractKey.bind(this);
  }

  render() {
    /* eslint-disable */
    return <FlatList
            onRefresh={this.props.onRefresh}
            refreshing={this.props.refreshing}
            keyExtractor={this._extractKey}
            data={this.props.cards}
            renderItem={this._renderItem}
            style={{flex: 1}} />;
    /* eslint-enable */
  }

  _renderItem({item}: {item: Card}) {
    const {onItemPress = (item: Card) => {}} = this.props;

    return (
      <TouchableOpacity onPress={() => onItemPress(item)}>
        <DataListItem
            image={item.lienImageDevant}
            upperLeftText={item.joueur.prenom + ' ' + item.joueur.nom}
            centerLeftText={item.editeur.nom}
            lowerLeftText={`${item.valeur}`}
            upperRightText={`${item.annee}`} />
      </TouchableOpacity>
    );
  }

  _extractKey(item: Card, index: number) {
    return item.idFiche;
  }
}
