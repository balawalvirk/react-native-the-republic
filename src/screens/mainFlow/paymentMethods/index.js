import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { AddPaymentMethodModal, ButtonColored, MainWrapper, Spacer, Toasts } from '../../../components';
import { colors, DummyData, sizes } from '../../../services';
import { RenderPaymentMethods } from './renderCards';

function PaymentMethods(props) {
    const [cards, setCards] = useState(DummyData.creditCards)
    const [SelectedIndex, selectIndex] = useState(0)
    const [isAddPaymentModalVisible, setAddPaymentModalVisibility] = useState(false)

    const toggleAddPaymentModal = () => setAddPaymentModalVisibility(!isAddPaymentModalVisible)
    return (
        <MainWrapper>
            <RenderPaymentMethods
                data={cards}
                selectedIndex={SelectedIndex}
                onPressSelect={(item, index) => selectIndex(index)}
                onPressItem={(item, index) => { }}
            />
            <Spacer height={sizes.baseMargin} />
            <ButtonColored
                text="Add Payment Method"
                buttonColor={colors.appBgColor4}
                tintColor={colors.appTextColor1}
                onPress={toggleAddPaymentModal}

            />
            <AddPaymentMethodModal
                isVisible={isAddPaymentModalVisible}
                toggleModal={toggleAddPaymentModal}
                onPressAddPaymentMethod={data => {
                    console.log('Card Data', data)
                    if(data){
                        toggleAddPaymentModal()
                        Toasts.success('Card Added Successfully')
                    }
                }}
            />
        </MainWrapper>
    );
}

export default PaymentMethods;
