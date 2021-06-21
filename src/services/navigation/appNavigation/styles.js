import { StyleSheet } from "react-native";
import { colors, sizes } from "../../utilities";

export default StyleSheet.create({
    drawerOption:{ marginHorizontal:sizes.marginHorizontalSmall,paddingHorizontal: sizes.marginHorizontal,paddingVertical: sizes.marginVertical,borderRadius:sizes.cardRadius},
    drawerOptionSelected:{backgroundColor: colors.appBgColor3, },
    upgradeBtn: { marginHorizontal:sizes.marginHorizontalSmall,paddingHorizontal: sizes.marginHorizontal,paddingVertical: sizes.marginVertical,borderRadius:sizes.cardRadius,backgroundColor: colors.appColor1,},
})