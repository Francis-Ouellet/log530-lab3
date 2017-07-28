// @flow
import React, {Component} from 'react';  // eslint-disable-line
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ListView
} from 'react-native';

import {DataListItem} from '.';
import {SearchComponentStyle} from './Styles';
import {Member} from '../Models';

import type {ReduxStateType} from '../Redux';

type PropsType = {
  members: $PropertyType<ReduxStateType, 'members'>
};

type StateType = {
  dataSource: $PropertyType<ListView, 'DataSource'>
};

export default class SearchComponent extends Component {
  props: PropsType;
  state: StateType;
  _renderRow: Function;
  _renderSectionHeader: Function;
  _renderHeader: Function;

  static propTypes = {
    members: PropTypes.arrayOf(PropTypes.instanceOf(Member))
  };

  constructor(props: PropsType) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1: any, r2: any) => r1 !== r2,
      sectionHeaderHasChanged: (s1: any, s2: any) => s1 !== s2
    });

    this._renderRow = this._renderRow.bind(this);
    this._renderSectionHeader = this._renderSectionHeader.bind(this);
    this._renderHeader = this._renderHeader.bind(this);

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections({
        Membres: props.members
      })
    };
  }

  shouldComponentUpdate(newProps: PropsType): boolean {
    return newProps.members !== this.props.members;
  }

  componentWillReceiveProps(newProps: PropsType) {
    let {members} = this.props;
    const {dataSource} = this.state;

    if (members !== newProps.members) {
      members = newProps.members;
    }

    this.setState({
      dataSource: dataSource.cloneWithRowsAndSections({
        Membres: members
      })
    });
  }

  render() {
    return (
      <View style={SearchComponentStyle.baseView}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <ListView
            style={SearchComponentStyle.listView}
            enableEmptySections={true}
            renderHeader={this._renderHeader}
            renderRow={this._renderRow}
            renderSectionHeader={this._renderSectionHeader}
            dataSource={this.state.dataSource} />
        </View>
      </View>
    );
  }

  _renderHeader() {
    const nbItems = this.props.members.length;

    return (
      <View style={SearchComponentStyle.headerView}>
        <Text style={SearchComponentStyle.headerText}>{nbItems} {nbItems > 0 ? 'éléments' : 'élément'}</Text>
      </View>
    );
  }

  _renderSectionHeader(sectionData: Member, sectionName: string) {
    return (
      <View style={SearchComponentStyle.sectionHeaderView}>
        <Text>{sectionName}</Text>
      </View>
    );
  }

  _renderRow(dataItem: Member) {
    return <DataListItem
            upperLeftText={dataItem.prenom + ' ' + dataItem.nom}
            centerLeftText={dataItem.nomUtilisateur}
            lowerLeftText="100 cartes"
            lowerRightText={'Depuis ' + dataItem.dateInscription.toISOString()}
            image={dataItem.lienPhotoProfil} />;
  }
}
