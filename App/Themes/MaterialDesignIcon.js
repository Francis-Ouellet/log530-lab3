// @flow
import {createIconSet} from 'react-native-vector-icons';

// Map icon names to Unicode codepoints in the icon font file
const glyphMap = {
  'user-check': 61448,
  'logout': 62275,
  'blank-circle': 61658
};
const iconSet = createIconSet(glyphMap, 'Material-Design-Icons', 'MaterialDesignIcons.ttf');
export default iconSet;
