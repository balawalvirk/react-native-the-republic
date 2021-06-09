import { Dimensions, Platform, StatusBar } from 'react-native'
import { totalSize } from 'react-native-dimension'

const { width, height } = Dimensions.get('window')

const statusBarHeight = Platform.select({
  ios: 40,
  android: StatusBar.currentHeight
})
const headerHeight = Platform.select({
  ios: height*0.08,
  android: height*0.1
})
const tabBarHeight= Platform.select({
  ios: height*0.07,
  android: height*0.07
})

// Used via Metrics.baseMargin
const sizes = {
  marginBottom : height*0.025,
  marginTop : height*0.025,
  marginHorizontalSmall: width*0.025,
  marginHorizontal: width*0.05,
  marginHorizontalLarge: width*0.075,
  marginHorizontalXLarge: width*0.1,
  marginVertical: height*0.025,
  section: 25,
  TinyMargin: totalSize(0.5),
  smallMargin: totalSize(1),
  baseMargin: totalSize(2),
  doubleBaseMargin: totalSize(5),
  doubleSection: 50,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: Platform.OS==='ios'?15:10,
  modalRadius: 15,
  cardRadius: 15,
  ModalRadius: 25,
  inputRadius:20,
  statusBarHeight:statusBarHeight,
  headerHeight:headerHeight,
  tabBarHeight:tabBarHeight,
  icons: {
    tiny: totalSize(1.5),
    small: totalSize(2),
    medium: totalSize(2.5),
    large: totalSize(3.5),
    xl: totalSize(4.5),
    xxl: totalSize(5)
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
}

export  {sizes}
