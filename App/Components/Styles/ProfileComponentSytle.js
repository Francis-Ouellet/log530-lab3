// @flow
import {StyleSheet} from 'react-native';

import {Colors} from '../../Themes';
import {ProfileComponentStyle} from './Styles';

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
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin:20,
    padding:20,
    backgroundColor:'blue',
    borderwidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  ProfileText: {
    alignItems: 'center'
  }

});
