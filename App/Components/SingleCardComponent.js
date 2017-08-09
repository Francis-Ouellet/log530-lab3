// @flow
import React, {Component} from 'react';  // eslint-disable-line
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

import {Card} from '../Models';
import {SingleCardComponentStyle} from './Styles';
import {Metrics} from '../Themes';

type PropsType = {
  card: Card
};

type StateType = {
  currentImageLabel: string
};

const LABELS = {
  devant: 'Devant',
  derriere: 'Derrière'
};

function DataLine(props: Object) {
  return (
    <View style={SingleCardComponentStyle.dataLineView}>
      <Text numberOfLines={1} style={SingleCardComponentStyle.dataLineLeftText}>{props.leftText}</Text>
      <Text numberOfLines={1} style={SingleCardComponentStyle.dataLineRightText}>{props.rightText}</Text>
    </View>
  );
}

export default class SingleCardComponent extends Component {
  props: PropsType;
  state: StateType;
  _handleScroll: Function;

  static propTypes = {
    card: PropTypes.instanceOf(Card).isRequired
  };

  constructor(props: PropsType) {
    super(props);

    this._handleScroll = this._handleScroll.bind(this);

    this.state = {
      currentImageLabel: LABELS.devant
    };
  }

  shouldComponentUpdate(newProps: PropsType, newState: StateType) {
    return newProps.card !== this.props.card ||
      newState.currentImageLabel !== this.state.currentImageLabel;
  }

  render() {
    const {card} = this.props;

    return (
      <ScrollView style={SingleCardComponentStyle.scrollView}>
        <View style={SingleCardComponentStyle.imageView}>
          <Text style={SingleCardComponentStyle.imageLabelText}>{this.state.currentImageLabel}</Text>
          <ScrollView
            style={SingleCardComponentStyle.imageScrollView}
            showsHorizontalScrollIndicator={false}
            onScroll={this._handleScroll}
            horizontal={true}
            pagingEnabled={true}>
            <Image
              resizeMode="contain"
              style={SingleCardComponentStyle.image}
              source={{uri: card.lienImageDevant}} />
            <Image
              resizeMode="contain"
              style={SingleCardComponentStyle.image}
              source={{uri: card.lienImageDerriere}} />
          </ScrollView>
        </View>
        <View style={{marginTop: 10}}>
          <DataLine leftText="Date de publication" rightText={card.datePublication.toISOString()} />
          <DataLine leftText="Éditeur" rightText={card.editeur.nom} />
          <DataLine leftText="Valeur" rightText={card.valeur} />
          <DataLine leftText="État" rightText={card.etat.charAt(0) + card.etat.slice(1).toLowerCase()} />
          <DataLine leftText="Année" rightText={card.annee} />

          <DataLine leftText="Prénom" rightText={card.joueur.prenom} />
          <DataLine leftText="Nom" rightText={card.joueur.nom} />
          <DataLine leftText="Équipe" rightText={card.joueur.nomEquipe} />
          <DataLine leftText="Numéro" rightText={card.joueur.numero} />
          <DataLine leftText="Position" rightText={card.joueur.position} />
          <DataLine leftText="Année recrue?" rightText={card.joueur.estRecrue ? 'Oui' : 'Non'} />
        </View>
      </ScrollView>
    );
  }

  _handleScroll(event: {nativeEvent: {contentOffset: Object}}) {
    const contentOffsetX = event.nativeEvent.contentOffset.x;

    if (contentOffsetX >= Metrics.screenWidth) {
      this.setState({
        currentImageLabel: LABELS.derriere
      });
    } else if (contentOffsetX <= 0) {
      this.setState({
        currentImageLabel: LABELS.devant
      });
    }
  }
}
