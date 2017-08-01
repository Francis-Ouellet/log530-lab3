// @flow
import {StyleSheet} from 'react-native';

import {Colors} from '../../Themes';

export default StyleSheet.create({
  baseView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subscribeView: {
    marginTop: 10,
    flexDirection: 'row'
  },
  subscribeText: {
    textDecorationLine: 'underline',
    color: Colors.hobbyBlue
  }
});
