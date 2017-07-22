// @flow
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from './Colors';

import MaterialDesignIcon from './MaterialDesignIcon';

const replaceSuffixPattern = /--(active|big|small|very-big)/g;

const icons = {
  'cached': [30, Colors.snow],
  'group': [30, Colors.snow],
  'user-check': [30, Colors.snow, MaterialDesignIcon],
  'assignment': [30, Colors.snow],
  'more-horiz': [30, Colors.snow],
  'account-circle': [30, Colors.snow, MaterialDesignIcon]
};

const defaultIconProvider = MDIcon;

let iconsMap: {
  cached?: Object,
  group?: Object,
  assignment?: Object,
  'user-check'?: Object,
  'more-horiz'?: Object
} = {};
let iconsLoaded = new Promise((resolve: Function, reject: Function) => {
  Promise.all(
    Object.keys(icons).map((iconName: string) => {
      const Provider = icons[iconName][2] || defaultIconProvider; // MDIcon
      return Provider.getImageSource(
        iconName.replace(replaceSuffixPattern, ''),
        icons[iconName][0],
        icons[iconName][1]
      );
    })
  ).then((sources: string[]) => {  // eslint-disable-line
    Object.keys(icons).forEach((iconName: string, idx: number) => iconsMap[iconName] = sources[idx]);

    // Call resolve (and we are done)
    resolve(true);
  });
});

export {
  iconsMap,
  iconsLoaded
};
