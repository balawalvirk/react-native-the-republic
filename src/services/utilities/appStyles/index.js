import { StyleSheet } from 'react-native'
import { totalSize, height, width } from 'react-native-dimension'
import { colors } from '../colors'
import { fontFamily, fontSize } from '../fonts'
import { sizes } from '../sizes'

export const appStyles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    height: null,
    width: null
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBgColor1
  },
  h1: {
    fontSize: fontSize.h1,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextBold
  },
  h2: {
    fontSize: fontSize.h2,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextBold
  },
  h3: {
    fontSize: fontSize.h3,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextBold
  },
  h4: {
    fontSize: fontSize.h4,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextBold
  },
  h5: {
    fontSize: fontSize.h5,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextBold
  },
  h6: {
    fontSize: fontSize.h6,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextMedium
  },
  textLarge: {
    fontSize: fontSize.large,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular
  },
  textMedium: {
    fontSize: fontSize.medium,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular
  },
  textRegular: {
    fontSize: fontSize.regular,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular
  },
  textSmall: {
    fontSize: fontSize.small,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular
  },
  textTiny: {
    fontSize: fontSize.tiny,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular
  },
  inputContainerUnderLined: {
    marginHorizontal: width(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF'
  },
  inputContainerBorderd: {
    marginHorizontal: width(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 0.5,
    borderColor: colors.appColor1
  },
  inputContainerColored: {
    marginHorizontal: width(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFF',
    borderRadius: 2.5
  },
  inputField: {
    height: height(7),
    //width: width(80),
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular,
    fontSize: totalSize(1.75)
  },
  inputFieldBorderd: {
    marginHorizontal: width(5),
    height: height(7),
    borderWidth: 0.5,
    borderColor: colors.appColor1,
    fontSize: totalSize(1.75),
    fontFamily: fontFamily.appTextRegular,
    borderRadius: 2.5
  },
  inputFieldColored: {
    marginHorizontal: width(5),
    height: height(7),
    fontSize: totalSize(1.75),
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: '#FFFF',
    borderRadius: 2.5,
  },

  buttonBorderd: {
    marginHorizontal: width(5),
    height: height(8),
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: colors.appColor1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonColord: {
    marginHorizontal: width(5),
    height: height(8),
    borderRadius: 2.5,
    backgroundColor: colors.appColor1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  SocialButtonColord: {
    height: height(8),
    marginHorizontal: width(5),
    borderRadius: 2.5,
    backgroundColor: colors.facebook,
    //  alignItems: 'center',
    //  justifyContent: 'center'
  },
  buttonText: {
    fontSize: totalSize(2),
    color: '#000000',
    fontFamily: fontFamily.appTextMedium
  },
  compContainer: {
    marginHorizontal: width(5),
    marginVertical: height(2.5)
  },
  rowCompContainer: {
    marginHorizontal: width(5),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height(2.5)
  },
  headerStyle: {
    backgroundColor: colors.headerBgColor1,
    elevation: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 0.5,
    height: height(8)
  },
  headerTitleStyle: {
    fontSize: totalSize(2),
    color: colors.appTextColor4,
    fontFamily: fontFamily.appTextMedium
  },
  cardView: {
    marginHorizontal: width(5),
    borderRadius: 5,
    backgroundColor: '#FFFF',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    elevation: 5
  },
  shadowExtraLight: {
    shadowColor: "#00000080",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,

    elevation: 1.5,
  },
  shadowLight: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,

    elevation: 3,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  shadowColored: {
    shadowColor: colors.appColor1,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  shadowDark: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.425,
    shadowRadius: 8.27,

    elevation: 10,
  },
  shadowExtraDark: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  textCenter: {
    textAlign: 'center'
  },
  textDarkGray: {
    color: colors.appTextColor3
  },
  textGray: {
    color: colors.appTextColor4
  },
  textLightGray: {
    color: colors.appTextColor5
  },
  textPrimaryColor: {
    color: colors.appColor1
  },
  textSocondaryColor: {
    color: colors.appColor2
  },
  textWhite: {
    color: colors.appTextColor6
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontExtraBold: {
    fontFamily: fontFamily.appTextBold
  },
  fontBold: {
    fontFamily: fontFamily.appTextBold
  },
  fontMedium: {
    fontFamily: fontFamily.appTextMedium
  },
  ButtonTextRegular: {
    fontSize: fontSize.regular,
    color: '#000000',
    fontFamily: fontFamily.appTextRegular
  },
  ButtonTextMedium: {
    fontSize: fontSize.medium,
    color: '#000000',
    fontFamily: fontFamily.appTextBold
  },
  headerPrimaryStyle: {
    backgroundColor: colors.appBgColor1,
    elevation: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    height: sizes.headerHeight
    // height: height(12.5),
    //marginTop:sizes.statusBarHeight
  },
  headerSecondaryStyle: {
    backgroundColor: colors.appBgColor1,
    elevation: 0,
    shadowColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: colors.appBgColor3,
    height: sizes.headerHeight,
  },
  headerTitleStyle: {
    fontSize: totalSize(2),
    color: colors.appTextColor2,
    fontFamily: fontFamily.appTextBold
  },
  smallMarginHorizontal: {
    marginHorizontal: sizes.marginHorizontalSmall
  },
  textColorError: {
    color: colors.error
  },
  textLineThrough: {
    textDecorationLine: 'line-through'
  },
  tabBarStyle: {
    height: sizes.tabBarHeight,
    borderTopWidth: 0,
    //justifyContent: 'center',
    // borderTopLeftRadius: sizes.cardRadius,
    //borderTopRightRadius: sizes.cardRadius,
    // paddingTop: height(1),
    //borderRadius: sizes.buttonRadius,
    backgroundColor: colors.appBgColor1,
    //paddingVertical:sizes.tabBarHeight/5,
    //position: 'absolute',
    //left: 0,
    //right: 0,
    //bottom: 0,
    //marginHorizontal: sizes.marginHorizontal,
    //marginBottom: Platform.OS === 'ios' ? height(2.5) : height(1.5),
    //paddingTop: sizes.tabBarHeight / 7,
    paddingBottom: sizes.tabBarHeight / 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.425,
    shadowRadius: 8.27,

    elevation: 10,
  },
  grayWrapper: {
    marginHorizontal: sizes.marginHorizontal,
    paddingHorizontal: sizes.marginHorizontal / 1.25,
    paddingVertical: sizes.marginVertical / 1.5,
    backgroundColor: colors.appBgColor3,
    borderRadius: sizes.cardRadius,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between'
},
borderedWrapper: {
    marginHorizontal: sizes.marginHorizontal,
    paddingHorizontal: sizes.marginHorizontal / 1.25,
    paddingVertical: sizes.marginVertical / 1.5,
    borderWidth: 1,
    borderColor: colors.appBgColor3,
    borderRadius: sizes.cardRadius,
},
menuContainer: {
  backgroundColor: colors.appBgColor1,
  borderRadius: sizes.buttonRadius,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  paddingHorizontal: sizes.marginHorizontalSmall*1.5,
  paddingVertical: sizes.marginVertical,
  margin: sizes.baseMargin
},
menuMainContainer:{ backgroundColor: 'transparent', shadowOpacity: 0, elevation: 0 }
})
