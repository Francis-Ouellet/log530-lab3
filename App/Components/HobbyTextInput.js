// @flow
import React from 'react';  // eslint-disable-line
import {
  TextInput,
  StyleSheet
} from 'react-native';

const STYLE = StyleSheet.create({
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    minWidth: 250,
    padding: 10
  }
});

export default (props: Object) => {
  const {
    style
  } = props;
  let ownProps = Object.assign({}, props);

  delete ownProps.style;
  delete ownProps.autoCapitalize;

  return <TextInput
          style={[STYLE.textInput, style]}
          autoCapitalize="none"
          {...ownProps} />;
};
