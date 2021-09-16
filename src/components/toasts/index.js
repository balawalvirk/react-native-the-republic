import { Keyboard } from "react-native"
const { default: Toast } = require("react-native-root-toast")
const { colors, appStyles } = require("../../services")

export const Toasts = {
    success: (text) => {
        Keyboard.dismiss()
        Toast.show(text ? text : 'Toast Message', {
            backgroundColor: colors.success,
            textColor: colors.appTextColor6,
            textStyle: [appStyles.textMedium,appStyles.textWhite],
            duration: 2000,
            shadow: false,
            // shadowColor: colors.appBgColor1
        })
    },
    error: (text) => {
        Keyboard.dismiss()
        Toast.show(text ? text : 'Toast Message', {
            backgroundColor: colors.error,
            textColor: colors.appTextColor6,
            textStyle: [appStyles.textMedium,appStyles.textWhite],
            duration: 2000,
            shadow: false,
            // shadowColor: colors.appBgColor1
        })
    },
}
