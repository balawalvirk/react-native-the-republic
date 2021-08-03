import React from 'react'
import { Wrapper,ComponentWrapper,ButtonBordered,Spacer,PopupPrimary } from "../..";
import { appStyles, colors, sizes } from "../../../services";
import { height } from 'react-native-dimension';


function ImagePickerPopup({ visible,toggle,onPressTakePhoto,onPressSelectFromGalary}) {
    return (
        <PopupPrimary
        visible={visible}
        title="Choose profile image"
        buttonText2="Cancel"
        onPressButton2={toggle}
        toggle={toggle}
        topMargin={height(60)}
    >
        <Wrapper>
            <ComponentWrapper style={[{marginHorizontal:sizes.marginHorizontalLarge}]}>
                <ButtonBordered
                    text="Take Photo"
                  //  iconName="camera"
                    buttonStyle={{backgroundColor: colors.appColor1+'20'}}
                    onPress={() => {
                        toggle();
                        setTimeout(() => {
                            onPressTakePhoto()
                        }, 500);
                    }}
                />
                <Spacer height={sizes.baseMargin} />
                <ButtonBordered
                    text="Select from galary"
                    //iconName="image"
                    buttonStyle={{backgroundColor: colors.appColor1+'20'}}
                    onPress={() => {
                        toggle();
                        setTimeout(() => {
                            onPressSelectFromGalary()
                        }, 500);
                    }}
                />
                <Spacer height={sizes.baseMargin} />
            </ComponentWrapper>
        </Wrapper>
    </PopupPrimary>
    );
}

export default ImagePickerPopup;