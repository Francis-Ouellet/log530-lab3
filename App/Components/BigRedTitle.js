// @flow
import React from 'react';  // eslint-disable-line
import {
  Text,
  StyleSheet
} from 'react-native';

import {Fonts, Colors} from '../Themes';

const STYLE = StyleSheet.create({
  text: {
    color: Colors.hobbyRed,
    fontSize: Fonts.size.h2,
    fontWeight: '900'
  }
});

export default (props: Object) => {
  const {
    children,
    style
  } = props;
  let ownProps = Object.assign({}, props);

  delete ownProps.children;
  delete ownProps.style;

  return <Text style={[STYLE.text, style]} {...ownProps}>{children}</Text>;
};
