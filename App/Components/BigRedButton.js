// @flow
import React from 'react';  // eslint-disable-line
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import {Colors, Fonts} from '../Themes';

const STYLE = StyleSheet.create({
  touchable: {
    minWidth: 250,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: Colors.hobbyRed,
    borderRadius: 5
  },
  text: {
    color: Colors.snow,
    fontSize: Fonts.size.h4,
    fontWeight: 'bold'
  }
});

export default (props: Object) => {
  const {
    style,
    textStyle,
    children
  } = props;
  let ownProps = Object.assign({}, props);

  delete ownProps.style;
  delete ownProps.textStyle;
  delete ownProps.children;

  return (
    <TouchableOpacity
      style={[STYLE.touchable, style]}
      {...ownProps}>
      <Text style={[STYLE.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};
