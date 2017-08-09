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
  lowerRightText?: ?string,
  upperLeftTextStyle?: Object,
  centerLeftTextStyle?: Object,
  lowerLeftTextStyle?: Object,
  upperRightTextStyle?: Object,
  centerRightTextStyle?: Object,
  lowerRightTextStyle?: Object
};

function SingleLineText(props: Object) {
  const {children} = props;
  delete props.children;
  delete props.numberOfLines;

  return <Text numberOfLines={1} {...props}>{children}</Text>;
}

export default class DataListItem extends Component {
  props: PropsType;

  static propTypes = {
    image: PropTypes.string,
    upperLeftText: PropTypes.string,
    centerLeftText: PropTypes.string,
    lowerLeftText: PropTypes.string,
    upperRightText: PropTypes.string,
    centerRightText: PropTypes.string,
    lowerRightText: PropTypes.string,
    upperLeftTextStyle: PropTypes.object,
    centerLeftTextStyle: PropTypes.object,
    lowerLeftTextStyle: PropTypes.object,
    upperRightTextStyle: PropTypes.object,
    centerRightTextStyle: PropTypes.object,
    lowerRightTextStyle: PropTypes.object
  };

  shouldComponentUpdate(newProps: PropsType): boolean {
    return this.props.image !== newProps.image ||
      this.props.upperLeftText !== newProps.upperLeftText ||
      this.props.centerLeftText !== newProps.centerLeftText ||
      this.props.lowerLeftText !== newProps.lowerLeftText ||
      this.props.upperRightText !== newProps.upperRightText ||
      this.props.centerRightText !== newProps.centerRightText ||
      this.props.lowerRightText !== newProps.lowerRightText;
  }

  render() {
    const {
      image,
      upperLeftText,
      upperRightText,
      centerLeftText,
      centerRightText,
      lowerLeftText,
      lowerRightText,
      upperLeftTextStyle = {},
      upperRightTextStyle = {},
      centerLeftTextStyle = {},
      centerRightTextStyle = {},
      lowerLeftTextStyle = {},
      lowerRightTextStyle = {}
    } = this.props;

    return (
      <View style={{flexDirection: 'column'}}>
        <View style={DataListItemStyle.baseView}>
          <View style={DataListItemStyle.leftView}>
            {image && <Image
                        source={{uri: image}}
                        resizeMode="stretch"
                        style={DataListItemStyle.image} />}
            <View style={DataListItemStyle.leftTextView}>
              <View style={DataListItemStyle.leftTextRowView}>
                {upperLeftText && <SingleLineText style={upperLeftTextStyle}>{upperLeftText}</SingleLineText>}
              </View>
              <View style={DataListItemStyle.leftTextRowView}>
                {centerLeftText && <SingleLineText style={centerLeftTextStyle}>{centerLeftText}</SingleLineText>}
              </View>
              <View style={DataListItemStyle.leftTextRowView}>
                {lowerLeftText && <SingleLineText style={lowerLeftTextStyle}>{lowerLeftText}</SingleLineText>}
              </View>
            </View>
          </View>
          <View style={DataListItemStyle.rightView}>
            <View style={DataListItemStyle.rightTextRowView}>
              {upperRightText && <SingleLineText style={upperRightTextStyle}>{upperRightText}</SingleLineText>}
            </View>
            <View style={DataListItemStyle.rightTextRowView}>
              {centerRightText && <SingleLineText style={centerRightTextStyle}>{centerRightText}</SingleLineText>}
            </View>
            <View style={DataListItemStyle.rightTextRowView}>
              {lowerRightText && <SingleLineText style={lowerRightTextStyle}>{lowerRightText}</SingleLineText>}
            </View>
          </View>
        </View>
        <View style={{backgroundColor: 'lightgray', height: 1}} />
      </View>
    );
  }
}
