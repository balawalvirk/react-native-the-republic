import React, { Component, useState } from 'react';
import { View, Text, Platform, UIManager, LayoutAnimation } from 'react-native';
import { Wrapper, ComponentWrapper, RowWrapper } from '../../wrappers';
import { KeyboardAvoidingScrollView } from '../../scrollViews';
import { Spacer } from '../../spacers';
import { sizes, appStyles, HelpingMethods } from '../../../services';
import { TextInputBordered, TextInputColored, TextInputUnderlined } from '../../textInput';
import { CheckBoxPrimary } from '../../checkBoxs';
import { CheckIconPrimary, CloseIconPrimary } from '../../icons';
import { ButtonColored } from '../../buttons';
import { RegularText, SmallTitle } from '../../text';
import { ModalSwipeablePrimary } from '../../modals';
import { height } from 'react-native-dimension';

function PaymentModal({
    isVisible, toggleModal, title,
    onPressAddPaymentMethod, hideSaveCardCheck,
    buttonText, detail
}) {
    const [cardNumber, setCardNumber] = useState('')
    const [name, setName] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [cardNumberError, setCardNumberError] = useState('')
    const [nameError, setNameError] = useState('')
    const [cardExpiryError, setCardExpiryError] = useState('')
    const [cvcError, setCvcError] = useState('')




    // Handle card number on change
    const handleOnChangeCardNumberText = (cardNumber) => {
        HelpingMethods.handleAnimation()
        !cardNumber ? setCardNumberError('') : cardNumber.length < 19 ? setCardNumberError('Please enter all 16 digits') : setCardNumberError('')
        //setState({ cardNumber })
        setCardNumber(cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())
    }

    const handleOnChangeCardExpiryText = (text) => {
        //setState({ cardNumber })
        HelpingMethods.handleAnimation()
        !text ? setCardExpiryError('') : text.length < 5 ? setCardExpiryError('Invalid expiry') : setCardExpiryError('')
        if (text.indexOf('.') >= 0 || text.length > 5) {
            return;
        }
        if (text.length === 2 && cardExpiry.length === 1) {
            text += '/'
        }
        // Update the state, which in turns updates the value in the text field
        setCardExpiry(text)
    }

    const handleOnChangeCvcText = (cvc) => {
        HelpingMethods.handleAnimation()
        !cvc ? setCvcError('') : cvc.length < 3 ? setCvcError('Invalid cvc') : setCvcError('')
        //setState({ cardNumber })
        setCvc(cvc)
    }
    const PaymentValidations = () => {
        HelpingMethods.handleAnimation()
        !cardNumber ? setCardNumberError('Enter card number.') : cardNumber.length < 19 ? setCardNumberError('Invalid card number') : setCardNumberError('')
        !cardExpiry ? setCardExpiryError('Enter expiry.') : cardExpiry.length < 5 ? setCardExpiryError('Invalid expiry') : setCardExpiryError('')
        !cvc ? setCvcError('Enter cvc') : cvc.length < 3 ? setCvcError('Invalid cvc') : setCvcError('')

        if (cardNumber.length === 19 && cardExpiry.length === 5 && cvc.length === 3) {
            return true
        } else {
            return false
        }
    }
    getPaymentInfo = () => {
        let paymentInfo = null
        if (PaymentValidations()) {
            paymentInfo = {
                card_number: cardNumber.replace(/\s/g, ''),
                expiry_date: cardExpiry,
                cvc: cvc,
                //save_card: saveCard,
                //card_type:GetCardType(cardNumber)
            }
            setCardNumber('')
            setCardExpiry('')
            setCvc('')
        } else {
            //Toast.show('Please check all fields')
        }
        return paymentInfo
    }



    return (
        <ModalSwipeablePrimary
            headerTitle={title ? title : 'Add New Payment Method'}
            visible={isVisible}
            toggle={toggleModal}
            topMargin={height(45)}
            hideHeader
        //disableSwipe
        >
            <Wrapper flex={1}>
                <KeyboardAvoidingScrollView>
                    <Spacer height={sizes.baseMargin*2}/>
                    <SmallTitle style={[appStyles.textCenter]}>{title ? title : 'Add New Payment Method'}</SmallTitle>
                    <Spacer height={sizes.baseMargin}/>
                    {detail && <>
                        <ComponentWrapper>
                            <RegularText style={[appStyles.textGray]}>{detail}</RegularText>
                        </ComponentWrapper>
                        <Spacer height={sizes.baseMargin} />
                    </>}
                    <TextInputUnderlined
                        title="Card Number"
                        // iconName="email-outline"
                        // iconType="material-community"
                        maxLength={19}
                        value={cardNumber}
                        onChangeText={text => handleOnChangeCardNumberText(text)}
                        error={cardNumberError}
                        keyboardType="number-pad"
                        right={
                            cardNumber ?
                                cardNumber.length === 19 ?
                                    <CheckIconPrimary />
                                    :
                                    <CloseIconPrimary />
                                :
                                null
                        }
                    />
                    <Spacer height={sizes.baseMargin} />
                    <TextInputUnderlined
                        title="Card Holder's Name"
                        // iconName="email-outline"
                        // iconType="material-community"
                        // maxLength={19}
                        value={name}
                        onChangeText={text => setName(text)}
                        error={nameError}
                        //  keyboardType="number-pad"
                        right={
                            name ?
                                name.length >= 2 ?
                                    <CheckIconPrimary />
                                    :
                                    <CloseIconPrimary />
                                :
                                null
                        }
                    />
                    <Spacer height={sizes.baseMargin} />
                    <RowWrapper>
                        <Wrapper flex={1}>
                            <TextInputUnderlined
                                title="Expiry"
                                // iconName="email-outline"
                                // iconType="material-community"
                                maxLength={5}
                                value={cardExpiry}
                                onChangeText={text => handleOnChangeCardExpiryText(text)}
                                error={cardExpiryError}
                                keyboardType="number-pad"
                                right={
                                    cardExpiry ?
                                        cardExpiry.length === 5 ?
                                            <CheckIconPrimary />
                                            :
                                            <CloseIconPrimary />
                                        :
                                        null
                                }
                                containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall, }}
                            />
                        </Wrapper>
                        <Spacer width={sizes.marginHorizontal} />
                        <Wrapper flex={1}>
                            <TextInputUnderlined
                                title="CVV"
                                // iconName="email-outline"
                                // iconType="material-community"
                                maxLength={3}
                                value={cvc}
                                onChangeText={text => handleOnChangeCvcText(text)}
                                error={cvcError}
                                keyboardType="number-pad"
                                secureTextEntry
                                right={
                                    cvc ?
                                        cvc.length === 3 ?
                                            <CheckIconPrimary />
                                            :
                                            <CloseIconPrimary />
                                        :
                                        null
                                }
                                containerStyle={{ marginHorizontal: sizes.marginHorizontalSmall, }}
                            />
                        </Wrapper>
                    </RowWrapper>
                    <Spacer height={sizes.smallMargin} />
                    <Spacer height={sizes.baseMargin} />
                    <ButtonColored
                        text={buttonText ? buttonText : "Add Payment Method"}
                        onPress={onPressAddPaymentMethod}
                    />
                </KeyboardAvoidingScrollView>
            </Wrapper>
        </ModalSwipeablePrimary>
    );
}

export default PaymentModal;
