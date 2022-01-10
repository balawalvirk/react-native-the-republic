import React, { Component, useState, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';
import { View, Text, FlatList } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { BorderedWrapper, ButtonBordered, ButtonGradient, CardWrapper, ColoredWrapper, ComponentWrapper, IconWithText, LargeText, LargeTitle, MainWrapper, MediumText, MediumTitle, PickerPrimary, PickerSearchable, PopupPrimary, RegularText, RowWrapper, RowWrapperBasic, SkeletonListVerticalSecondary, SkeletonPrimary, SmallTitle, Spacer, TextInputUnderlined, TinyTitle, Toasts, Wrapper, XLTitle, XXLTitle } from '../../../components';
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

// const tempBanks = [
//     {
//         label: 'ABC bank',
//         value: 'abc'
//     },
//     {
//         label: 'DEF bank',
//         value: 'def'
//     },
//     {
//         label: 'GHI bank',
//         value: 'ghi'
//     }
// ]
export default function WithdrawEarnings(props) {

    //local states
    const [bankAccounts, setBackAccounts] = useState(null)
    const [banks, setBanks] = useState(null)
    const [loadingAddBankAccount, setLoadingAddBankAccount] = useState(false)
    const [isAddBankAccountPopupVisible, setAddBankAccountPopupVisibility] = useState(false)
    const [loading, setLoading] = useState(false)

    //redux states
    const user = useSelector(state => state.user)
    const { reports, userDetail } = user
    //console.log('userDetail-->', userDetail)
    const { seller_stripe_account_id, email, first_name, last_name } = userDetail
    //console.log('seller_stripe_account_id-->', seller_stripe_account_id)



    const toggleAddBankAccountPopup = () => setAddBankAccountPopupVisibility(!isAddBankAccountPopupVisible)

    useEffect(() => {
        getAllData()
    }, [])

    const getAllData = async () => {
        await getSetAllBanks()
        await getSetBankAccounts()
    }
    const getSetBankAccounts = async () => {
        await Backend.getBankAccounts().
            then(res => {
                if (res) {
                    setBackAccounts(res.data)
                }
            })
    }
    const getSetAllBanks = async () => {
        await Backend.getBanks().
            then(res => {
                if (res?.success) {
                    if (res?.data?.length) {
                        let tempData = []
                        for (const item of res.data) {
                            const tempObj = {
                                ...item,
                                label: item.name,
                                value: item.name,

                            }
                            tempData.push(tempObj)
                        }
                        setBanks(tempData)
                    } else {
                        setBanks(res.data)
                    }
                }
            })
    }

    const addBankAccount = async (bankData) => {
        console.log('bank_data-->', bankData)
        if (bankData) {
            const { accountHolderName, accountNumber, routingNumber } = bankData
            setLoadingAddBankAccount(true)

            // await Backend.addBankAccount({ bank_name: bank.label, account_no: accountNumber }).
            //     then(async res => {
            //         if (res) {
            //             await getSetBankAccounts()
            //             toggleAddBankAccountPopup()
            //             setLoadingAddBankAccount(false)
            //             Toasts.success('Bank account added')
            //         } else {
            //             toggleAddBankAccountPopup()
            //             setLoadingAddBankAccount(false)
            //         }
            //     })

            // await Backend.createStripeAccount({
            //     email,
            //     account_holder_name: accountHolderName,
            //     account_number: accountNumber,
            //     routing_number: routingNumber
            // }).
            //     then(async res => {
            //         if (res) {
            //             await Backend.update_profile({ seller_stripe_account_id: res.id })
            //         }
            //     })

            await Backend.createStripeAccountFetch().
                then(res => {

                })
            setLoadingAddBankAccount(false)
        }

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
            {
                !seller_stripe_account_id ?
                    // <ColoredWrapper
                    //     onPress={handleCreateStripeExpressAccount}
                    //     style={{ paddingVertical: sizes.marginVertical }}>
                    //     <IconWithText
                    //         iconName={'cc-stripe'}
                    //         iconSize={totalSize(5)}
                    //         tintColor={colors.appColor1}
                    //         iconType={'font-awesome-5'}
                    //         title={'Tap to create stripe express account'}
                    //         text={'You have to create stripe express account in order to transfer your earnings to your bank account.'}
                    //         direction={'column'}
                    //         textStyle={[appStyles.textSmall, appStyles.textGray, appStyles.textCenter]}
                    //         titleStyle={[appStyles.textCenter]}
                    //     />
                    // </ColoredWrapper>
                    <ButtonBordered
                        text="Add bank account"
                        buttonStyle={[{ height: height(10), borderStyle: 'dashed', marginVertical: sizes.marginVertical / 2 }]}
                        textStyle={[appStyles.h6, appStyles.fontBold]}
                        onPress={toggleAddBankAccountPopup}
                    />
                    :
                    <BankAccounts
                        data={bankAccounts}
                        onPressItem={(item, index) => { }}
                    //onPressAdd={toggleAddBankAccountPopup}
                    />
            }
            <AddBankAccountPopup
                visible={isAddBankAccountPopupVisible}
                toggle={toggleAddBankAccountPopup}
                onPressDone={addBankAccount}
                isLoading={loadingAddBankAccount}
                banks={banks}
            />
        </MainWrapper>
    );
}




function BankAccounts({ data, onPressItem, onPressAdd }) {
    if (!data) {
        return (
            <>
                {[1, 2, 3, 4, 5].map((item, index) => {
                    return (
                        <SkeletonPrimary itemStyle={{ marginBottom: sizes.smallMargin }} />
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
        // ListFooterComponent={() => {
        //     return (
        //         <ButtonBordered
        //             text="Add bank account"
        //             buttonStyle={[{ height: height(10), borderStyle: 'dashed', marginVertical: sizes.marginVertical / 2 }]}
        //             textStyle={[appStyles.h6, appStyles.fontBold]}
        //             onPress={onPressAdd}

        //         />
        //     )
        // }}
        />
    )
}

function AddBankAccountPopup({ visible, toggle, onPressDone, isLoading, banks }) {

    const [bank, setBank] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [accountHolderName, setAccountHolderName] = useState('')
    const [routingNumber, setRoutingNumber] = useState('')
    const [bankError, setBankError] = useState('')
    const [accountHolderNameError, setAccountHolderNameError] = useState('')
    const [acNumberError, setAcNumberError] = useState('')
    const [routingNumberError, setRoutingNumberError] = useState('')

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
        //!bank ? setBankError('Please select bank') : setBankError('')
        !accountHolderName ? setAccountHolderNameError('Please enter account holder name') : setAccountHolderNameError('')
        !accountNumber ? setAcNumberError('Please enter account number') : setAcNumberError('')
        !routingNumber ? setRoutingNumberError('Please enter routing number') : routingNumber.length != 9 ? setRoutingNumberError('It must be 9 digits') : setRoutingNumberError('')
        if (accountNumber && accountHolderName && routingNumber.length === 9) { return true } else { return false }
    }
    const handleAdd = () => {
        if (validate()) {
            const obj = {
                //bank,
                accountNumber,
                accountHolderName,
                routingNumber
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
            topMargin={keyboardVisible ? height(20) : height(40)}
            keyboardShouldPersistTaps
            loadingButton1={isLoading}
        >

            {/* <PickerSearchable
                data={banks}
                title="Select Bank"
                value={bank.label}
                onChangeText={() => {
                    if (bank) {
                        setBank('')
                    }
                }}
                onPressItem={(item, index) => {
                    setBank(item)
                    console.log('item', item)
                }}
                error={bankError}
            /> */}
            <TextInputUnderlined
                title="Account Holder Name"
                value={accountHolderName}
                onChangeText={t => setAccountHolderName(t)}
                error={accountHolderNameError}
            />
            <Spacer height={sizes.baseMargin} />
            <TextInputUnderlined
                title="Account Number"
                value={accountNumber}
                onChangeText={t => setAccountNumber(t)}
                error={acNumberError}
            />
            <Spacer height={sizes.baseMargin} />
            <TextInputUnderlined
                title="Routing Number"
                value={routingNumber}
                onChangeText={t => setRoutingNumber(t)}
                error={routingNumberError}
            />
            <Spacer height={sizes.baseMargin} />
        </PopupPrimary>
    )
}