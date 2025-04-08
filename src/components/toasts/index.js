import { Keyboard } from "react-native"
// const { default: Toast } = require("react-native-root-toast")
import Toast from 'react-native-toast-message';
const { colors, appStyles } = require("../../services")


export const Toasts = {
    success: (text) => {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: text
          });
    },
    error: (text) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: text
          });
    },
    warn: (text) => {
        Toast.show({
            type: 'info',
            text1: 'Info',
            text2: text
          });
    },
}


//USING react-native-root-toast
// export const Toasts = {
//     success: (text) => {
//         Keyboard.dismiss()
//         Toast.show(text ? text : 'Toast Message', {
//             backgroundColor: colors.success,
//             textColor: colors.appTextColor6,
//             textStyle: [appStyles.textMedium,appStyles.textWhite],
//             duration: 2000,
//             shadow: false,
//             // shadowColor: colors.appBgColor1
//         })
//     },
//     error: (text) => {
//         Keyboard.dismiss()
//         Toast.show(text ? text : 'Toast Message', {
//             backgroundColor: colors.error,
//             textColor: colors.appTextColor6,
//             textStyle: [appStyles.textMedium,appStyles.textWhite],
//             duration: 2000,
//             shadow: false,
//             // shadowColor: colors.appBgColor1
//         })
//     },
//     warn: (text) => {
//         Keyboard.dismiss()
//         Toast.show(text ? text : 'Toast Message', {
//             backgroundColor: colors.bloodOrange,
//             textColor: colors.appTextColor6,
//             textStyle: [appStyles.textMedium,appStyles.textWhite],
//             duration: 2000,
//             shadow: false,
//             // shadowColor: colors.appBgColor1
//         })
//     },
// }
