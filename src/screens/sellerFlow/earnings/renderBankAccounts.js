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

export function RenderBankAccounts({ data, onPressItem, onPressAdd }) {
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
                                    {/* <TinyTitle>Select bank account</TinyTitle> */}
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
                    <BankAccountCard
                        bankName={item.bank_name}
                        bankAccountLastDigits={item.last4}
                        onPress={() => onPressItem(item, index)}
                    />
                )
            }}
            ListFooterComponent={() => {
                return (
                    <>
                        {
                            !data.length ?
                                <ButtonBordered
                                    text="Add bank account"
                                    buttonStyle={[{ height: height(10), borderStyle: 'dashed', marginVertical: sizes.marginVertical / 2 }]}
                                    textStyle={[appStyles.h6, appStyles.fontBold]}
                                    onPress={onPressAdd}
                                />
                                :
                                null
                        }
                    </>
                )
            }}
        />
    )
}


export const BankAccountCard = ({ bankAccountLastDigits, bankName, onPress }) => {
    return (
        <ColoredWrapper activeOpacity={1} onPress={onPress} style={[{ backgroundColor: colors.appBgColor1, marginVertical: sizes.marginVertical / 2 }, appStyles.shadow]}>
            <RowWrapperBasic>
                <Wrapper flex={1}>
                    <LargeText style={[appStyles.fontBold]}>{bankName}</LargeText>
                    <Spacer height={sizes.baseMargin} />
                    {/* <RegularText>***************{item.account_no.slice(10)}</RegularText> */}
                    <RegularText>***************{bankAccountLastDigits}</RegularText>
                </Wrapper>
                <Icon
                    name="arrow-right"
                    type="feather"
                    color={colors.appColor1}
                    size={totalSize(3)}
                />
            </RowWrapperBasic>
        </ColoredWrapper>
    )
}