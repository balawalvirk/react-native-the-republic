import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {height, totalSize, width} from 'react-native-dimension';
import {colors, appStyles, fontSize, sizes} from '../../services';
import {ButtonTextRegular, ButtonTextMedium} from '../text';
import {color} from 'react-native-reanimated';
import {CustomIcon} from '../icons';
import {
  Wrapper,
  RowWrapperBasic,
  RowWrapper,
  ComponentWrapper,
  AbsoluteWrapper,
} from '../wrappers';
import LinearGradient from 'react-native-linear-gradient';
import {MaterialIndicator} from 'react-native-indicators';
import ButtonGroupAnimated from './animatedButtonGroup';

export const ButtonColored = ({
  text,
  isLoading,
  activityColor,
  animation,
  onPress,
  disabled,
  buttonStyle,
  customIcon,
  textStyle,
  iconName,
  iconType,
  iconSize,
  buttonColor,
  iconStyle,
  tintColor,
  direction,
  left,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={isLoading ? true : disabled}>
      <Wrapper
        animation={animation}
        style={[
          appStyles.buttonColord,
          {
            borderRadius: sizes.buttonRadius,
            height: height(6),
            backgroundColor: disabled
              ? colors.appColor1 + '80'
              : buttonColor
              ? buttonColor
              : colors.appColor1,
            marginHorizontal: sizes.marginHorizontalXLarge,
          },
          buttonStyle,
        ]}>
        <View
          style={{
            flexDirection: direction ? direction : 'row',
            alignItems: 'center',
          }}>
          {left ? (
            left
          ) : customIcon ? (
            <CustomIcon
              icon={customIcon}
              size={iconSize ? iconSize : totalSize(3)}
              color={tintColor && tintColor}
              containerStyle={iconStyle}
            />
          ) : iconName ? (
            <Icon
              name={iconName ? iconName : 'email-outline'}
              type={iconType ? iconType : 'material-community'}
              size={iconSize ? iconSize : totalSize(3)}
              color={tintColor ? tintColor : colors.appTextColor6}
              iconStyle={[iconStyle]}
            />
          ) : null}
          {isLoading ? (
            <MaterialIndicator
              size={totalSize(2.5)}
              color={tintColor ? tintColor : '#FFFFFF'}
            />
          ) : (
            <ButtonTextMedium
              style={[
                {color: tintColor ? tintColor : colors.appTextColor6},
                textStyle,
              ]}>
              {text}
            </ButtonTextMedium>
          )}
        </View>
      </Wrapper>
    </TouchableOpacity>
  );
};

export const ButtonColoredSmall = ({
  text,
  onPress,
  disabled,
  buttonStyle,
  customIcon,
  direction,
  textStyle,
  iconName,
  iconType,
  iconSize,
  iconColor,
  iconStyle,
  isLoading,
  tintColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          borderRadius: 15,
          paddingHorizontal: width(5),
          paddingVertical: height(1),
          backgroundColor: colors.appColor1,
        },
        buttonStyle,
      ]}>
      <View
        style={{
          flexDirection: direction ? direction : 'row',
          alignItems: 'center',
        }}>
        {customIcon ? (
          <CustomIcon
            icon={customIcon}
            size={iconSize ? iconSize : totalSize(2)}
            color={iconColor ? iconColor : colors.appTextColor6}
          />
        ) : iconName ? (
          <Icon
            name={iconName ? iconName : 'email-outline'}
            type={iconType ? iconType : 'material-community'}
            size={iconSize ? iconSize : totalSize(2)}
            color={iconColor ? iconColor : colors.appTextColor6}
            iconStyle={[{}, iconStyle]}
          />
        ) : null}
        <Wrapper>
          <ButtonTextRegular
            style={[
              {
                color: tintColor ? tintColor : colors.appTextColor6,
                opacity: isLoading ? 0 : 1,
              },
              textStyle,
            ]}>
            {' '}
            {text}{' '}
          </ButtonTextRegular>
          {isLoading ? (
            <AbsoluteWrapper
              style={{
                right: 0,
                bottom: 0,
                left: 0,
                top: 0,
                ...appStyles.center,
              }}>
              <MaterialIndicator
                color={tintColor ? tintColor : colors.appTextColor6}
                size={totalSize(1.5)}
              />
            </AbsoluteWrapper>
          ) : null}
        </Wrapper>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonBordered = ({
  text,
  onPress,
  buttonStyle,
  textStyle,
  iconName,
  customIcon,
  iconType,
  iconSize,
  iconColor,
  iconStyle,
  tintColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        appStyles.buttonBorderd,
        {
          borderRadius: sizes.buttonRadius,
          height: height(6),
          borderColor: tintColor ? tintColor : colors.appColor1,
        },
        buttonStyle,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {customIcon ? (
          <CustomIcon
            icon={customIcon}
            size={iconSize ? iconSize : totalSize(3)}
            color={iconColor ? iconColor : null}
            style={[{marginRight: width(5)}, iconStyle]}
          />
        ) : iconName ? (
          <Icon
            name={iconName ? iconName : 'email-outline'}
            type={iconType ? iconType : 'material-community'}
            size={iconSize ? iconSize : totalSize(3)}
            color={
              iconColor ? iconColor : tintColor ? tintColor : colors.appColor1
            }
            iconStyle={[{marginRight: width(5)}, iconStyle]}
          />
        ) : null}
        <ButtonTextMedium
          style={[
            {color: tintColor ? tintColor : colors.appColor1},
            textStyle,
          ]}>
          {text}
        </ButtonTextMedium>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonBorderedSmall = ({
  text,
  onPress,
  buttonStyle,
  rowReverse,
  textStyle,
  iconName,
  iconType,
  iconSize,
  iconColor,
  iconStyle,
  tintColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          borderRadius: 15,
          paddingHorizontal: width(5),
          paddingVertical: height(1),
          borderColor: tintColor ? tintColor : colors.appColor1,
          borderWidth: 1,
        },
        buttonStyle,
      ]}>
      <View
        style={{
          flexDirection: rowReverse ? 'row-reverse' : 'row',
          alignItems: 'center',
        }}>
        {iconName ? (
          <Icon
            name={iconName ? iconName : 'email-outline'}
            type={iconType ? iconType : 'material-community'}
            size={iconSize ? iconSize : totalSize(2)}
            color={tintColor ? tintColor : colors.appColor1}
            iconStyle={[{marginHorizontal: width(2)}, iconStyle]}
          />
        ) : null}
        <Text
          style={[
            appStyles.ButtonTextRegular,
            {
              color: tintColor ? tintColor : colors.appColor1,
              fontSize: fontSize.regular,
            },
            textStyle,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonArrowColored = ({
  text,
  onPress,
  animation,
  buttonStyle,
  textStyle,
  iconName,
  iconType,
  iconSize,
  buttonColor,
  iconStyle,
  tintColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ComponentWrapper
        animation={animation}
        style={[
          {
            borderRadius: sizes.buttonRadius,
            backgroundColor: buttonColor ? buttonColor : colors.appColor1,
            paddingVertical: height(1.25),
          },
          appStyles.shadow,
          buttonStyle,
        ]}>
        <RowWrapper>
          <ButtonTextMedium
            style={[
              {color: tintColor ? tintColor : colors.appTextColor6},
              textStyle,
            ]}>
            {text}
          </ButtonTextMedium>
          <Icon
            name={iconName ? iconName : 'chevron-right'}
            type={iconType ? iconType : 'material-community'}
            size={iconSize ? iconSize : totalSize(5)}
            color={tintColor ? tintColor : colors.appTextColor6}
            iconStyle={[{}, iconStyle]}
          />
        </RowWrapper>
      </ComponentWrapper>
    </TouchableOpacity>
  );
};

export function ButtonGradient({
  text,
  animation,
  onPress,
  buttonStyle,
  textStyle,
  iconName,
  iconType,
  iconSize,
  buttonColor,
  iconStyle,
  tintColor,
  loading,
  shadow,
  gradiantContainerStyle,
}) {
  return (
    <Pressable
      disabled={loading}
      onPress={onPress}
      style={[
        {
          backgroundColor: 'white',
          height: height(6),
          borderRadius: sizes.buttonRadius,
          marginHorizontal: sizes.marginHorizontalXLarge,
        },
        shadow && appStyles.shadow,
        buttonStyle,
      ]}>
      <LinearGradient
        colors={colors.appGradiantColors}
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0, 0.9]}
        style={[
          {flex: 1, borderRadius: sizes.buttonRadius},
          appStyles.center,
          gradiantContainerStyle,
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {iconName ? (
            <Icon
              name={iconName ? iconName : 'email-outline'}
              type={iconType ? iconType : 'material-community'}
              size={iconSize ? iconSize : totalSize(3)}
              color={tintColor ? tintColor : colors.appTextColor6}
              iconStyle={[{marginRight: width(5)}, iconStyle]}
            />
          ) : null}
          {loading ? (
            <MaterialIndicator size={totalSize(2.5)} color={'#FFFFFF'} />
          ) : (
            <ButtonTextMedium
              style={[{color: tintColor ? tintColor : '#FFFFFF'}, textStyle]}>
              {text}
            </ButtonTextMedium>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export const ButtonSocial = ({
  text,
  onPress,
  logo,
  iconName,
  iconType,
  iconColor,
  isLoading,
}) => {
  return (
    <ButtonColored
      text={text ? text : 'Social Button'}
      buttonColor={colors.appBgColor3}
      iconName={iconName}
      iconType={iconType}
      tintColor={iconColor}
      customIcon={logo}
      //onPress={() => { }}
      textStyle={[appStyles.ButtonTextMedium]}
      iconStyle={{marginRight: sizes.marginHorizontalSmall}}
      onPress={onPress}
      left={
        isLoading ? (
          <Wrapper style={{marginRight: sizes.marginHorizontalSmall}}>
            <MaterialIndicator
              size={totalSize(2.5)}
              color={iconColor ? iconColor : colors.appTextColor1}
            />
          </Wrapper>
        ) : null
      }
    />
  );
};
export const AddButton = ({onPress, style, size, buttonSize}) => {
  const defaultButtonSize = width(20);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        appStyles.center,
        {
          borderRadius: sizes.baseRadius,
          backgroundColor: colors.appBgColor3,
          height: buttonSize ? buttonSize : defaultButtonSize,
          width: buttonSize ? buttonSize : defaultButtonSize,
        },
        style,
      ]}>
      <Icon
        name="add"
        type="ionicon"
        size={size ? size : sizes.icons.large}
        color={colors.appTextColor4}
      />
    </TouchableOpacity>
  );
};

export {ButtonGroupAnimated};
