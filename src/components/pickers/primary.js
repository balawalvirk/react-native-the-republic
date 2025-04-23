import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Platform,
  Animated,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {height, totalSize, width} from 'react-native-dimension';
import {
  colors,
  fontSize,
  fontFamily,
  sizes,
  appIcons,
  appStyles,
  HelpingMethods,
} from '../../services';
import RNPickerSelect from 'react-native-picker-select';
import {
  AbsoluteWrapper,
  Wrapper,
  ComponentWrapper,
  RowWrapper,
} from '../wrappers';
import {SmallText, InputTitle, MediumText, RegularText} from '../text';
import {CustomIcon, IconWithText} from '../icons';
import {Spacer} from '../spacers';
import {TextInputUnderlined} from '../textInput';
import {MaterialIndicator} from 'react-native-indicators';
import {Dropdown} from 'react-native-element-dropdown';

export default ({
  onDonePress,
  containerStyle,
  data,
  title,
  onChange,
  placeholder,
  error,
  value,
  itemKey,
  left,
  customIconLeft,
  iconSizeLeft,
  iconColorLeft,
  iconStyleLeft,
  iconNameLeft,
  iconTypeLeft,
  mainContainerStyle,
  disableSearch,
}) => {
  const placeholderObject = {
    label: placeholder || '',
    value: 'placeholder',
  };
  const [titleMarginBottom] = useState(
    new Animated.Value(value ? height(6) : 0),
  );
  //const [titleSize] = useState(new Animated.Value(fontSize.regular))
  //const FocusedTitleMarginBottom = Platform.OS === 'ios' ? height(5) : height(5)
  //const [titleMarginBottom, setTitleMarginBottom] = useState(0)
  //const [titleSize, setTitleSize] = useState(fontSize.input)
  const moveTitleUp = () => {
    Animated.timing(titleMarginBottom, {
      toValue: height(6),
      duration: 250,
      speed: 50,
      useNativeDriver: false,
    }).start();
  };
  const moveTitleDown = () => {
    Animated.timing(titleMarginBottom, {
      toValue: 0,
      duration: 250,
      speed: 50,
      useNativeDriver: false,
    }).start();
  };
  const onChangeValue = value => {
    value === 'placeholder' ? moveTitleDown() : moveTitleUp();
  };

  useEffect(()=>{
if(value){
  onChangeValue(value)
}
  },[value])
  return (
    <Wrapper
      style={[
        {marginHorizontal: sizes.marginHorizontalLarge},
        mainContainerStyle,
      ]}>
      {/* <ComponentWrapper>
                <InputTitle>{title}</InputTitle>
            </ComponentWrapper>
            <Spacer height={sizes.TinyMargin} /> */}
      <View
        style={[
          appStyles.inputContainerUnderLined,
          {
            //borderRadius: sizes.b,
            borderBottomWidth: 1,
            borderBottomColor: colors.appBgColor4,
            marginHorizontal: 0,
          },
          containerStyle,
        ]}>
        {left ? (
          left
        ) : customIconLeft ? (
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <CustomIcon
              icon={customIconLeft}
              size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium}
              color={iconColorLeft ? iconColorLeft : colors.appTextColor3}
              containerStyle={iconStyleLeft}
            />
          </View>
        ) : iconNameLeft ? (
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Icon
              name={iconNameLeft}
              type={iconTypeLeft}
              size={iconSizeLeft ? iconSizeLeft : sizes.icons.medium}
              color={iconColorLeft ? iconColorLeft : colors.appTextColor1}
              iconStyle={iconStyleLeft}
            />
          </View>
        ) : null}
        <Wrapper flex={8}>
          <AbsoluteWrapper
            style={{
              top: 0,
              bottom: 0,
              ...appStyles.center,
              backgroundColor: 'transparet',
            }}>
            <Wrapper style={{marginBottom: titleMarginBottom}}>
              <InputTitle>{title}</InputTitle>
            </Wrapper>
          </AbsoluteWrapper>
          {/* <RNPickerSelect
                        onDonePress={onDonePress}
                        onValueChange={(value, index) => {
                            onChangeValue(value, index)
                            onChange ? onChange(value, index) : null;
                        }}
                        value={value}
                        itemKey={itemKey}
                        items={data}
                        placeholder={placeholderObject}
                        useNativeAndroidPickerStyle={false}
                        pickerProps={{ mode: 'dropdown' }}
                        //  pickerProps={{ mode: 'dropdown',overflow: 'hidden', style: { overflow: 'hidden' } }}
                        // pickerProps={{ style: { height: 214, overflow: 'hidden' } }}
                        style={{
                            width: width(100),
                            ...PickerPrimaryStyles,
                            //inputIOSContainer: { pointerEvents: "none" },
                            iconContainer: {
                                top: height(3.5),
                                right: 0,
                            },
                            placeholder:{color: '#909090',}
                        }}
                        textInputProps={{ pointerEvents: "none" }}
                        Icon={() =>
                            <Icon name="caret-down-sharp" type="ionicon" size={totalSize(1.5)} color={colors.appTextColor3} />
                            // <CustomIcon
                            //     icon={appIcons.dropdown_normal}
                            //     size={totalSize(2)}
                            // />
                        }
                    /> */}
          <Dropdown
            style={styles.dropdown}
            // mode='modal'
            //dropdownPosition='top'
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search={!disableSearch}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder||""}
            searchPlaceholder={`Search ${title||''}`}
            value={value}
            onChange={item => {
              console.log('onChange: ', item);
              onChangeValue(item.value)
              onChange && onChange(item.value);
            }}
            renderRightIcon={() => (
              <Icon
                name="caret-down-sharp"
                type="ionicon"
                size={totalSize(1.5)}
                color={colors.appTextColor3}
              />
            )}
            // renderLeftIcon={() => (
            //     <Icon name="caret-down-sharp" type="ionicon" size={totalSize(1.5)} color={colors.appTextColor3} />
            // )}
          />
        </Wrapper>
      </View>
      {error ? (
        // <AbsoluteWrapper animation="shake" style={{ bottom: 0, right: sizes.marginHorizontal, left: 0, }}>
        //     <SmallText style={[{ color: colors.error, textAlign: 'right' }]}>{error}</SmallText>
        // </AbsoluteWrapper>
        <Wrapper style={{}} animation="shake">
          <Spacer height={sizes.TinyMargin} />
          <IconWithText
            iconName="alert-circle-outline"
            //title="New"
            text={error}
            tintColor={colors.error}
            iconSize={sizes.icons.tiny}
            textStyle={[{fontSize: fontSize.small}]}
          />
        </Wrapper>
      ) : null}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    // backgroundColor:'red',
    height: height(8),
    //margin: 16,
    //height: 50,
    //   borderBottomColor: 'gray',
    //   borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: fontSize.medium,
  },
  selectedTextStyle: {
    fontSize: fontSize.medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: height(5),
    fontSize: fontSize.regular,
  },
});

// const PickerPrimaryStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: fontSize.medium,
//         fontFamily: fontFamily.appTextRegular,
//         //paddingVertical: height(2),
//         height: height(8),
//         paddingHorizontal: 0,
//         marginHorizontal: 0,
//         //borderWidth: 1,
//         //borderColor: colors.appTextColor5,
//         //  borderRadius: 5,
//         color: 'black',
//         //paddingRight: 30, // to ensure the text is never behind the icon
//     },
//     inputAndroid: {
//         fontSize: fontSize.medium,
//         fontFamily: fontFamily.appTextRegular,
//         //paddingVertical: height(2),
//         height: height(8),
//         paddingHorizontal: 0,
//         marginHorizontal: 0,
//         // borderWidth: 1,
//         // borderColor: colors.appTextColor5,
//         //borderRadius: 5,
//         color: 'black',
//         //paddingRight: 30, // to ensure the text is never behind the icon
//     },
// });
