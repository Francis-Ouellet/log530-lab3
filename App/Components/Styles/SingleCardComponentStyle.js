// @flow
import {StyleSheet} from 'react-native';

import {Fonts, Metrics} from '../../Themes';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: 'column'
  },
  imageView: {
    height: 350,
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageLabelText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: Fonts.size.h5,
    fontWeight: 'bold'
  },
  imageScrollView: {
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: Metrics.screenWidth,
    borderColor: 'lightgray',
    borderWidth: 1
  },
  dataLineView: {
    flexDirection: 'row',
    padding: 5
  },
  dataLineLeftText: {
    flex: 1,
    fontSize: Fonts.size.medium,
    fontWeight: 'bold'
  },
  dataLineRightText: {
    flex: 1,
    textAlign: 'right'
  }
});
