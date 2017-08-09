// @flow
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  baseView: {
    flex: 1,
    flexDirection: 'column'
  },
  listView: {
    flex: 1,
  },
  headerView: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'gray'
  },
  sectionHeaderView: {
    padding: 5,
    backgroundColor: 'lightgray'
  }
});
