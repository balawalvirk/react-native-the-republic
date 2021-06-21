import React from 'react';
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
import { height, width } from 'react-native-dimension';
import { appStyles, colors, sizes } from '../../services';


export default class AnimatedGroupButton extends React.Component {
  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.state = {
      activeTabTranslateX: new Animated.Value(0),
      activeTabWidth: new Animated.Value(0),
      activeTabHeight: new Animated.Value(0),
      selectedTabIndex: 0,
    };
  }

  handleTabSlide = (x, height, width) => {
    let { activeTabTranslateX, activeTabHeight, activeTabWidth } = this.state;
    console.log(x, height, width);
    Animated.spring(activeTabTranslateX, {
      toValue: x,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(activeTabHeight, {
      toValue: height,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.spring(activeTabWidth, {
      toValue: width,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  handleOnPress = (item, key) => {
    this.setState({ selectedTabIndex: key }, () =>
      this.handleTabSlide(item.x, item.tabHeight, item.tabWidth),
    );
  };
  scrollTo(object) {
    this.scrollViewRef.current.scrollToIndex(object);
  }
  render() {
    let {
      activeTabTranslateX,
      activeTabHeight,
      activeTabWidth,
      selectedTabIndex,
    } = this.state;
    const {
      onPressButton,
      data,
      activeButtonStyle,
      inActiveButtonStyle,
      activeTextStyle,
      inactiveTextStyle,
      text,
      scrollViewRef,
      containerStyle,
    } = this.props;
    return (
      <View style={[styles.animatedGroupButtonMainContainer, containerStyle]}>
        <View>
          <ScrollView
            ref={this.scrollViewRef}
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
                        ? this.handleTabSlide(
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
                  onPress={() =>
                    onPressButton(item, key, this.handleOnPress(item, key))
                  }>
                  <RegularText
                    style={[
                      styles.animatedGroupButtonInactivatedButtonTxt,
                      inactiveTextStyle,
                    ]}>
                    {item[text]}
                    {/* {text} */}
                  </RegularText>
                </TouchableHighlight>
              );
            })}
            <Animated.View
              style={[
                {
                  ...styles.animatedGroupButtonActivatedButton,
                  height: activeTabHeight,
                  width: activeTabWidth,
                  transform: [
                    {
                      translateX: activeTabTranslateX,
                    },
                  ],
                },
                activeButtonStyle,
              ]}>
              <RegularText
                style={[
                  styles.animatedGroupButtonActivatedButtonTxt,
                  inactiveTextStyle,
                ]}>
                {data[selectedTabIndex][text]}
              </RegularText>
            </Animated.View>
          </ScrollView>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  // Animated Button Group styles
  animatedGroupButtonMainContainer: {
    flex: 1
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