// @flow
import React, {Component} from 'react';  // eslint-disable-line
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text
} from 'react-native';

import {DataListItemStyle} from './Styles';

type PropsType = {
  image?: ?string,
  upperLeftText?: ?string,
  centerLeftText?: ?string,
  lowerLeftText?: ?string,
  upperRightText?: ?string,
  centerRightText?: ?string,
  lowerRightText?: ?string
};

export default class DataListItem extends Component {
  props: PropsType;

  static propTypes = {
    image: PropTypes.string,
    upperLeftText: PropTypes.string,
    centerLeftText: PropTypes.string,
    lowerLeftText: PropTypes.string,
    upperRightText: PropTypes.string,
    centerRightText: PropTypes.string,
    lowerRightText: PropTypes.string
  };

  // shouldComponentUpdate(newProps: PropsType): boolean {
  //   return this.props.image !== newProps.image ||
  //     this.props.upperLeftText !== newProps.upperLeftText ||
  //     this.props.centerLeftText !== newProps.centerLeftText ||
  //     this.props.lowerLeftText !== newProps.lowerLeftText ||
  //     this.props.upperRightText !== newProps.upperRightText ||
  //     this.props.centerRightText !== newProps.centerRightText ||
  //     this.props.lowerRightText !== newProps.lowerRightText;
  // }

  render() {
    const {
      image,
      upperLeftText,
      upperRightText,
      centerLeftText,
      centerRightText,
      lowerLeftText,
      lowerRightText
    } = this.props;

    return (
      <View style={{flexDirection: 'column'}}>
        <View style={DataListItemStyle.baseView}>
          <View style={DataListItemStyle.leftView}>
            {image && <Image source={{uri: image}} style={DataListItemStyle.image} />}
            <View style={DataListItemStyle.leftTextView}>
              <View style={DataListItemStyle.leftTextRowView}>
                {upperLeftText && <Text>{upperLeftText}</Text>}
              </View>
              <View style={DataListItemStyle.leftTextRowView}>
                {centerLeftText && <Text>{centerLeftText}</Text>}
              </View>
              <View style={DataListItemStyle.leftTextRowView}>
                {lowerLeftText && <Text>{lowerLeftText}</Text>}
              </View>
            </View>
          </View>
          <View style={DataListItemStyle.rightView}>
            <View style={DataListItemStyle.rightTextRowView}>
              {upperRightText && <Text>{upperRightText}</Text>}
            </View>
            <View style={DataListItemStyle.rightTextRowView}>
              {centerRightText && <Text>{centerRightText}</Text>}
            </View>
            <View style={DataListItemStyle.rightTextRowView}>
              {lowerRightText && <Text>{lowerRightText}</Text>}
            </View>
          </View>
        </View>
        <View style={{backgroundColor: 'lightgray', height: 1}} />
      </View>
    );
  }
}
