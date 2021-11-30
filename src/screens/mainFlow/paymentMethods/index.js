import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { AddDataViewPrimary, AddPaymentMethodModal, ButtonColored, IconWithText, MainWrapper, Spacer, Toasts, Wrapper } from '../../../components';
import { appStyles, Backend, colors, DummyData, sizes } from '../../../services';
import { RenderPaymentMethods } from './renderCards';

function PaymentMethods(props) {

    //redux states
    const user = useSelector(state => state.user)
    const { creditCards, userDetail } = user
    //const [cards, setCards] = useState(DummyData.creditCards)
    const [defaultCardIndex, setDefaultCardIndex] = useState(-1)
    const [isAddPaymentModalVisible, setAddPaymentModalVisibility] = useState(false)
    const [loadingAddCard, setLoadingAddCard] = useState(false)
    const [loadingDefault, setLoadingDefault] = useState(-1)

    useEffect(() => {
        const default_card_id = userDetail.default_card_id
        console.log(default_card_id)
        console.log(creditCards.length)

        if (creditCards.length) {
            const tempCreditCard = creditCards.find(item => item.id.toString() === default_card_id)
            console.log('tempCreditCard', tempCreditCard)
            if (tempCreditCard) {
                const tempCrediCardIndex = creditCards.indexOf(tempCreditCard)
                if (tempCrediCardIndex >= 0) {
                    setDefaultCardIndex(tempCrediCardIndex)
                }
            }
        }
    }, [userDetail])

    const toggleAddPaymentModal = () => setAddPaymentModalVisibility(!isAddPaymentModalVisible)

    const handleAddPaymentMethod = async (cardDetails) => {
        // console.log('cardDetails-->', cardDetails)
        setLoadingAddCard(true)
        await Backend.add_credit_card(cardDetails).
            then(async res => {
                if (res) {
                    await Backend.get_credit_cards()
                    await Backend.update_profile({ default_card_id: res.data.id })
                    toggleAddPaymentModal()
                    Toasts.success('Payment method added')
                }
            })
        setLoadingAddCard(false)
    }
    const handleSetDefaultpaymentMethod = async (item, index) => {
        setLoadingDefault(index)
        await Backend.update_profile({ default_card_id: item.id })
        setLoadingDefault(-1)
    }
    return (
        <MainWrapper>
            {
                creditCards.length ?
                    <>
                        <RenderPaymentMethods
                            data={creditCards}
                            selectedIndex={defaultCardIndex}
                            onPressSelect={(item, index) => handleSetDefaultpaymentMethod(item, index)}
                            onPressItem={(item, index) => { }}
                            loadingIndex={loadingDefault}
                        />
                        <Spacer height={sizes.baseMargin} />
                        <ButtonColored
                            text="Add Payment Method"
                            buttonColor={colors.appBgColor3}
                            tintColor={colors.appTextColor1}
                            onPress={toggleAddPaymentModal}

                        />
                    </>
                    :
                    <AddDataViewPrimary
                        title='Payment Method'
                        iconName='credit-card-plus'
                        iconType="material-community"
                        onPress={toggleAddPaymentModal}
                    />
            }
            <AddPaymentMethodModal
                isVisible={isAddPaymentModalVisible}
                toggleModal={toggleAddPaymentModal}
                onPressAddPaymentMethod={data => {
                    console.log('Card Data', data)
                    if (data) {
                        handleAddPaymentMethod(data)
                    }
                }}
                isLoading={loadingAddCard}
            />
        </MainWrapper>
    );
}

export default PaymentMethods;
