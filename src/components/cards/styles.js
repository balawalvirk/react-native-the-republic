import { StyleSheet } from "react-native";
import { colors, sizes } from "../../services";

export default StyleSheet.create({
    smallMarginHorizontal: {
        marginHorizontal: sizes.marginHorizontalSmall
    },
    productContainerGrid: {
        borderWidth: 1,
        borderColor: colors.appBgColor4,
        borderRadius: sizes.cardRadius,
        marginHorizontal: sizes.marginHorizontal
    },
    productContainerList: {
       // flex:1,
        borderWidth: 1,
        borderColor: colors.appBgColor4,
        borderRadius: sizes.cardRadius,
        marginHorizontal: sizes.marginHorizontal,
        flexDirection:'row',
       // alignItems:'center'
    },
    orderCardPrimaryContainer: {
        // flex:1,
         borderWidth: 1,
         borderColor: colors.appBgColor4,
         borderRadius: sizes.cardRadius,
         marginHorizontal: sizes.marginHorizontal,
         //flexDirection:'row',
        // alignItems:'center'
     },
    reviewContainer: {
        borderWidth: 1,
        borderColor: colors.appBgColor4,
        borderRadius: sizes.cardRadius,
        marginHorizontal: sizes.marginHorizontal,
        paddingHorizontal:sizes.marginHorizontalSmall,
        paddingVertical:sizes.marginVertical/2
    },
   
})