// @flow
import {StyleSheet} from 'react-native';

import {Metrics} from '../../Themes';

const VIEW_PADDING = 5;
const IMAGE_DIM = Metrics.baseListItemHeight - 2 * VIEW_PADDING;

export default StyleSheet.create({
  baseView: {
    height: Metrics.baseListItemHeight,
    flexDirection: 'row'
  },
  leftView: {
    flex: 2,
    padding: VIEW_PADDING,
    flexDirection: 'row'
  },
  rightView: {
    flex: 1,
    padding: VIEW_PADDING,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  image: {
    width: IMAGE_DIM,
    height: IMAGE_DIM
  },
  leftTextView: {
    flexDirection: 'column',
    marginLeft: 5
  },
  rightTextRowView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  leftTextRowView: {
    flex: 1,
    justifyContent: 'center'
  }
});
