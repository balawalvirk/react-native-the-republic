import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes, appStyles, appImages } from '../../services';
import { IconWithText, CustomIcon } from '../icons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { RowWrapperBasic } from '../wrappers';
import { TinyTitle } from '../text';
import { Spacer } from '../spacers';

export const LogoMain = ({ size}) => {
  return (
    <CustomIcon
      icon={appImages.logo_main}
      size={size?size:totalSize(25)}
    />
  );
}