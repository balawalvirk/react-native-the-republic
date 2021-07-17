import React, { useState } from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { MediumText, RegularText } from '../text';
import { StyleSheet } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { appStyles, colors, sizes } from '../../services';
import { Icon } from 'react-native-elements';
import { CustomIcon } from '../icons';


export default function AnimatedGroupButton({
  onPressButton,
  data,
  activeButtonStyle,
  inActiveButtonStyle,
  activeTextStyle,
  inActiveTextStyle,
  text,
  //scrollViewRef,
  containerStyle,
  iconSize,
  activeButtonContent,
  activeButtonForceStyle,
  initalIndex
}) {

  const scrollViewRef = React.useRef();
  const [activeTabTranslateX] = useState(new Animated.Value(0))
  const [activeTabWidth] = useState(new Animated.Value(0))
  const [activeTabHeight] = useState(new Animated.Value(0))
  const [selectedTabIndex, setTabIndex] = useState(0)

  const handleTabSlide = (x, height, width) => {
    console.log(x, height, width);
    Animated.timing(activeTabTranslateX, {
      toValue: x,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(activeTabHeight, {
      toValue: height,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(activeTabWidth, {
      toValue: width,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }
  const handleOnPress = async (item, key) => {
    setTabIndex(key)
    handleTabSlide(item.x, item.tabHeight, item.tabWidth)
  }

  if (selectedTabIndex != initalIndex && data[initalIndex].x) {
    handleOnPress(data[initalIndex], initalIndex)
  }


  return (
    <View style={[styles.animatedGroupButtonMainContainer, containerStyle]}>
      <View >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {data.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor={colors.appBgColor3 + '80'}
                onLayout={event => {
                  (item.x = event.nativeEvent.layout.x),
                    (item.tabHeight = event.nativeEvent.layout.height),
                    (item.tabWidth = event.nativeEvent.layout.width),
                    key === 0
                      ? handleTabSlide(
                        item.x,
                        item.tabHeight,
                        item.tabWidth,
                      )
                      : null;
                }}
                style={[
                  {
                    ...styles.animatedGroupButtonInactivatedButton,
                    borderColor:
                      key === selectedTabIndex ? 'transparent' : 'lightgray',
                    marginLeft: key === 0 ? sizes.marginHorizontal : 0,
                    marginRight: sizes.marginHorizontal / 2
                  },
                  inActiveButtonStyle,
                ]}
                onPress={async () => {
                  onPressButton && onPressButton(item, key,)
                  handleOnPress(item, key);
                }

                }>
                {
                  !item.icon ?
                    <RegularText
                      style={[
                        styles.animatedGroupButtonInactivatedButtonTxt,
                        selectedTabIndex === key ? activeTextStyle : inActiveTextStyle,
                      ]}>
                      {item[text]}
                      {/* {text} */}
                    </RegularText>
                    :
                    <CustomIcon
                      icon={item.icon}
                      color={appStyles.textPrimaryColor.color}
                      size={iconSize ? iconSize : totalSize(1.5)}
                    />

                }
              </TouchableHighlight>
            );
          })}
          <Animated.View
            style={[
              !activeButtonForceStyle && styles.animatedGroupButtonActivatedButton,
              {
                height: activeTabHeight,
                width: activeTabWidth,
                transform: [
                  {
                    translateX: activeTabTranslateX,
                  },
                ],
              },
              activeButtonStyle,
              activeButtonForceStyle
            ]}>
            {
              activeButtonContent ?
                activeButtonContent :
                !data[selectedTabIndex].icon ?
                  <RegularText
                    style={[
                      styles.animatedGroupButtonActivatedButtonTxt,
                      activeTextStyle,
                    ]}>
                    {data[selectedTabIndex][text]}
                  </RegularText>
                  :
                  <CustomIcon
                    icon={data[selectedTabIndex].icon}
                    color={appStyles.textWhite.color}
                    size={iconSize ? iconSize : totalSize(1.5)}
                  />
            }

          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  // Animated Button Group styles
  animatedGroupButtonMainContainer: {

  },
  animatedGroupButtonInactivatedButton: {
    borderRadius: 100,
    // height: height(5),
    //width: width(30),
    paddingVertical: sizes.marginVertical / 1.5,
    paddingHorizontal: sizes.marginHorizontal,
    marginHorizontal: width(1),
    backgroundColor: colors.appBgColor3,
    ...appStyles.center,
  },
  animatedGroupButtonInactivatedButtonTxt: {
    //color: colors.appTextColor4
  },
  animatedGroupButtonActivatedButton: {
    position: "absolute",
    top: 0,
    backgroundColor: colors.appColor1,
    borderRadius: 100,
    ...appStyles.center,
  },
  animatedGroupButtonActivatedButtonTxt: {
    ...appStyles.textWhite
  },
})