import { StyleSheet } from "react-native";

const { height, width } = require("react-native-dimension");
const { sizes } = require("../../services");

export default StyleSheet.create({
    skeletonItemPrimary: { height: height(3), width: width(40), borderRadius: sizes.buttonRadius },
    topMarginTiny: { marginTop: sizes.TinyMargin },
    topMarginSmall: { marginTop: sizes.smallMargin },
    topMarginBase: { marginTop: sizes.baseMargin },
    topMarginDoubleBase: { marginTop: sizes.doubleBaseMargin },
    horizontalMarginBase: { marginHorizontal: sizes.marginHorizontal },
    row: { flexDirection:'row',alignItems:'center' },
    rowBasic: { flexDirection:'row',marginHorizontal: sizes.marginHorizontal,alignItems:'center',justifyContent:'space-between' }
});