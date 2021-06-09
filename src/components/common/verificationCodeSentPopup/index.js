import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { PopupPrimary } from '..';
import { appStyles, sizes } from '../../../services';
import { Spacer } from '../../spacers';
import { MediumText } from '../../text';
import { ComponentWrapper, Wrapper } from '../../wrappers';

function VerficationCodeSentPopup({ visible, toggle, onPressContinue,phoneNumber }) {
    return (
        <PopupPrimary
            visible={visible}
            iconName="check"
            toggle={toggle}
            title="Verification Code Sent"
            info={`A six digit verification code has been sent to your phone ${phoneNumber}`}
            buttonText1="Continue"
            onPressButton1={() => {
                toggle();
                onPressContinue()
            }}
            topMargin={height(55)}
        >
            <Wrapper>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <MediumText
                        style={[appStyles.textCenter, appStyles.textGray]}>Tap continue to enter code.
            </MediumText>
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
            </Wrapper>
        </PopupPrimary>
    );
}

export default VerficationCodeSentPopup;
