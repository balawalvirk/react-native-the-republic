import React, { Component, useState, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';
import { View, Text, FlatList } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { ButtonBordered, ButtonGradient, CardWrapper, ColoredWrapper, ComponentWrapper, LargeText, LargeTitle, MainWrapper, MediumText, MediumTitle, PickerPrimary, PickerSearchable, PopupPrimary, RegularText, RowWrapper, RowWrapperBasic, SkeletonListVerticalSecondary, SkeletonPrimary, SmallTitle, Spacer, TextInputUnderlined, TinyTitle, Toasts, Wrapper, XLTitle, XXLTitle } from '../../../components';
import { appStyles, Backend, colors, HelpingMethods, sizes } from '../../../services';

// const bankAccounts = [
//     {
//         label: 'National Bank',
//         accountNumber: '1662945420036576'
//     },
//     {
//         label: 'Summit Bank',
//         accountNumber: '6635349834578523'
//     }
// ]


function WithdrawEarnings(props) {

    //local states
    const [bankAccounts, setBackAccounts] = useState(null)
    const [loadingAddBankAccount, setLoadingAddBankAccount] = useState(false)
    const [isAddBankAccountPopupVisible, setAddBankAccountPopupVisibility] = useState(false)

     //redux states
  const user = useSelector(state => state.user)
  const { reports } = user

    const toggleAddBankAccountPopup = () => setAddBankAccountPopupVisibility(!isAddBankAccountPopupVisible)

    useEffect(() => {
        getSetBankAccounts()
    }, [])

    const getSetBankAccounts = async () => {
        await Backend.getBankAccounts().
            then(res => {
                if (res) {
                    setBackAccounts(res.bankAccounts)
                }
            })
    }

    const addBankAccount = async (data) => {
        console.log('data-->', data)
        const { bank, accountNo } = data
        setLoadingAddBankAccount(true)
        await Backend.addBankAccount({ bank_name: bank.label, account_no: accountNo }).
            then(async res => {
                if (res) {
                    await getSetBankAccounts()
                    toggleAddBankAccountPopup()
                    setLoadingAddBankAccount(false)
                    Toasts.success('Bank account added')
                } else {
                    toggleAddBankAccountPopup()
                    setLoadingAddBankAccount(false)
                }
            })

    }

    return (
        <MainWrapper>
            <Spacer height={sizes.baseMargin * 1.5} />
            <ComponentWrapper style={[appStyles.center]}>
                <MediumText> Available for Withdrawal </MediumText>
                <Spacer height={sizes.baseMargin} />
                <XXLTitle style={appStyles.textPrimaryColor}>${reports.available_withdraw}</XXLTitle>
            </ComponentWrapper>
            <Spacer height={sizes.doubleBaseMargin} />

            <BankAccounts
                data={bankAccounts}
                onPressItem={(item, index) => { }}
                onPressAdd={toggleAddBankAccountPopup}
            />
            <AddBankAccountPopup
                visible={isAddBankAccountPopupVisible}
                toggle={toggleAddBankAccountPopup}
                onPressDone={addBankAccount}
                isLoading={loadingAddBankAccount}
            />
        </MainWrapper>
    );
}

export default WithdrawEarnings;


function BankAccounts({ data, onPressItem, onPressAdd }) {
    if (!data) {
        return (
            <>
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <SkeletonPrimary itemStyle={{  marginBottom: sizes.smallMargin }} />
              )
            })}
          </>
        )
    }
    return (
        <FlatList
            data={data}
            key={'key'}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => {
                return (
                    <>
                        {
                            data.length ?
                                <ComponentWrapper>
                                    <TinyTitle>Select bank account</TinyTitle>
                                    <Spacer height={sizes.smallMargin} />
                                </ComponentWrapper>
                                :
                                null
                        }
                    </>
                )
            }}
            renderItem={({ item, index }) => {
                return (
                    <ColoredWrapper activeOpacity={1} onPress={() => onPressItem(item, index)} style={[{ backgroundColor: colors.appBgColor1, marginVertical: sizes.marginVertical / 2 }, appStyles.shadow]}>
                        <RowWrapperBasic>
                            <Wrapper flex={1}>
                                <LargeText style={[appStyles.fontBold]}>{item.bank_name}</LargeText>
                                <Spacer height={sizes.baseMargin} />
                                <RegularText>***************{item.account_no.slice(10)}</RegularText>
                            </Wrapper>
                            <Icon
                                label="arrow-right"
                                type="feather"
                                color={colors.appColor1}
                                size={totalSize(3)}
                            />
                        </RowWrapperBasic>
                    </ColoredWrapper>
                )
            }}
            ListFooterComponent={() => {
                return (
                    <ButtonBordered
                        text="Add bank account"
                        buttonStyle={[{ height: height(10), borderStyle: 'dashed', marginVertical: sizes.marginVertical / 2 }]}
                        textStyle={[appStyles.h6, appStyles.fontBold]}
                        onPress={onPressAdd}

                    />
                )
            }}
        />
    )
}

function AddBankAccountPopup({ visible, toggle, onPressDone, isLoading }) {
    const banks = [
        {
            label: 'ABC bank',
            value: 'abc'
        },
        {
            label: 'DEF bank',
            value: 'def'
        },
        {
            label: 'GHI bank',
            value: 'ghi'
        }
    ]
    const [bank, setBank] = useState('')
    const [accountNo, setAccountNo] = useState('')
    const [bankError, setBankError] = useState('')
    const [acNumberError, setAcNumberError] = useState('')

    // manage keyboard
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    let keyboardDidShowListener
    let keyboardDidHideListener
    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(true) });
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { HelpingMethods.handleAnimation(); setKeyboardVisible(false) });
    })

    const validate = () => {
        HelpingMethods.handleAnimation()
        !bank ? setBankError('Please select bank') : setBankError('')
        !accountNo ? setAcNumberError('Please enter account number') : setAcNumberError('')
        if (bank && accountNo) { return true } else { return false }
    }
    const handleAdd = () => {
        if (validate()) {
            const obj = {
                bank,
                accountNo
            }
            return obj
        } else {
            return null
        }
    }
    return (
        <PopupPrimary
            visible={visible}
            toggle={toggle}
            title="Add bank account"
            buttonText1="Done"
            onPressButton1={() => onPressDone(handleAdd())}
            topMargin={keyboardVisible ? height(20) : height(50)}
            keyboardShouldPersistTaps
            loadingButton1={isLoading}
        >

            <PickerSearchable
                data={banks}
                title="Select Bank"
                value={bank.label}
                onChangeText={() => {
                    if (bank) {
                        setBank('')
                    }
                }}
                //placeholder="Your Shoe Size"
                // error={sizeError}
                onPressItem={(item, index) => {
                    setBank(item)
                    console.log('item', item)
                }}
                error={bankError}
            />
            <Spacer height={sizes.baseMargin} />
            <TextInputUnderlined
                title="Account Number"
                value={accountNo}
                onChangeText={t => setAccountNo(t)}
                error={acNumberError}
            />
            <Spacer height={sizes.baseMargin} />
        </PopupPrimary>
    )
}