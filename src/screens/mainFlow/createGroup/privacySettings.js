import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { ButtonGradient, ComponentWrapper, IconButton, LineHorizontal, MainWrapper, Spacer, TinyTitle, UserCardPrimary, Wrapper } from '../../../components';
import { colors, groupJoinPrivacies, groupPostPrivacies, sizes } from '../../../services';

const joinOptions = [
    {
        title: 'Everyone',
        subTitle: 'People can search and join this group',
        value: groupJoinPrivacies.everyone
    },
    {
        title: 'Only Approved Members',
        subTitle: 'People can search and request to join this group',
        value: groupJoinPrivacies.onlyApprovedMembers
    },
    {
        title: 'Only Invited People',
        subTitle: 'No one can search this group, only invited members are allowed in this group',
        value: groupJoinPrivacies.onlyInvitedPeople
    }
]
const postOptions = [
    {
        title: 'Everyone',
        subTitle: 'Any member can post in this group',
        value: groupPostPrivacies.everyone
    },
    {
        title: 'Only Admins',
        subTitle: 'Only admins can post in this group',
        value: groupPostPrivacies.onlyAdmin
    },
]
const Options = ({ data, onPressOption, value }) => {
    return (
        <>
            {
                data.map((item, index) => {
                    const isSelected = value === item.value
                    return (
                        <UserCardPrimary
                            onPress={() => onPressOption(item, index)}
                            containerStyle={{ marginHorizontal: 0, borderRadius: 0, paddingHorizontal: sizes.marginHorizontalSmall, backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: colors.appBgColor3 }}
                            title={item.title}
                            subTitle={item.subTitle}
                            left={
                                <IconButton
                                    iconName="circle"
                                    iconColor={isSelected ? colors.appColor1 : colors.appBgColor1}
                                    buttonSize={totalSize(2.75)}
                                    iconSize={totalSize(2.25)}
                                    //buttonColor={colors.appBgColor3}
                                    buttonStyle={{ borderWidth: 1, borderColor: isSelected ? colors.appColor1 : colors.appBgColor3, marginRight: sizes.marginHorizontalSmall }}
                                />
                            }
                        />
                    )
                })
            }
        </>
    )
}

function PrivacySettings({ navigation, route }) {
    const { navigate, goBack, setParams } = navigation
    const {
        groupJoinPrivacy,
        groupPostPrivacy,
        handleSetGroupJoinPrivacy,
        handleSetGroupPostPrivacy } = route.params


    return (
        <MainWrapper>
            <Wrapper flex={1}>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <TinyTitle>Who can join this group?</TinyTitle>
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <LineHorizontal />
                <Options
                    data={joinOptions}
                    onPressOption={(item, index) => {
                        setParams({ groupJoinPrivacy: item.value })
                        handleSetGroupJoinPrivacy(item.value)
                    }}
                    value={groupJoinPrivacy}
                />
                <Spacer height={sizes.baseMargin * 2} />
                <ComponentWrapper>
                    <TinyTitle>Who can post in this group?</TinyTitle>
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <LineHorizontal />
                <Options
                    data={postOptions}
                    onPressOption={(item, index) => {
                        setParams({ groupPostPrivacy: item.value })
                        handleSetGroupPostPrivacy(item.value)
                    }}
                    value={groupPostPrivacy}
                />
            </Wrapper>
            <Wrapper style={{}}>
                <Spacer height={sizes.baseMargin} />
                <ButtonGradient
                    text="Done"
                    onPress={goBack}
                />
                <Spacer height={sizes.baseMargin} />
            </Wrapper>
        </MainWrapper>
    );
}

export default PrivacySettings;
