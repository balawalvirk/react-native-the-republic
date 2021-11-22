import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGradient, CustomIcon, MediumText, Spacer, TinyTitle, Wrapper, Groups, ButtonColoredSmall, IconButton, SkeletonPrimary } from '../../../components';
import { appIcons, appStyles, Backend, colors, routes, sizes } from '../../../services';
import dummyData from '../../../services/constants/dummyData';
import { navigate } from '../../../services/navigation/rootNavigation';
import { setMyGroups } from '../../../services/store/actions';


export default function YourGroups({ tab }) {

    //redux states
    const dispatch = useDispatch()
    const group = useSelector(state => state.group)
    const { myGroups } = group

    //local states
    const [loading, setLoading] = useState(true)


    useFocusEffect(
        React.useCallback(() => {
            getSetGroups()

        }, [])
    )

    const getSetGroups = async () => {
        await Backend.getUserGroups().
            then(res => {
                if (res) {
                    dispatch(setMyGroups(res.data))
                }
            })
        loading && setLoading(false)
    }
    if (loading) {
        return (
            <>
                <Spacer height={sizes.baseMargin} />
                {
                    [1, 2, 3, 4, 5, 6].map((item, index) => {
                        return (
                            <SkeletonPrimary itemStyle={{ height: height(10), marginBottom: sizes.marginVertical / 2 }} />
                        )
                    })
                }
            </>
        )
    }
    return (
        <Wrapper flex={1} >
            {
                myGroups.length ?
                    <Wrapper>
                        <Groups
                            data={myGroups}
                            onPress={(item, index) => navigate(routes.groupDetail, { group: item })}
                            handleJoin={(item, index) => { }}
                            ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
                            ListFooterComponent={() => {
                                return <Wrapper>
                                    <Spacer height={sizes.baseMargin} />
                                    <ButtonGradient
                                        text="Create Group"
                                        onPress={() => navigate(routes.createGroup)}
                                    />
                                    <Spacer height={sizes.baseMargin} />
                                </Wrapper>
                            }}
                            right={(item, index) => {
                                return (
                                    <IconButton
                                        iconName="pencil"
                                        buttonColor={colors.appBgColor3}
                                        iconSize={totalSize(2)}
                                        buttonSize={totalSize(3.5)}
                                        onPress={() => navigate(routes.createGroup, { groupData: item })}
                                    />
                                )
                            }}

                        />
                    </Wrapper>
                    :
                    <NoDataView />
            }
        </Wrapper>
    );
}

function NoDataView() {


    return (
        <Wrapper flex={1} >
            <Wrapper flex={1} style={[{ justifyContent: 'center', }]}>
                <Wrapper style={[appStyles.center]}>
                    <CustomIcon
                        size={totalSize(20)}
                        icon={appIcons.user_connect}
                    />
                    <Spacer height={sizes.baseMargin} />
                    <TinyTitle style={[appStyles.textCenter]}>You have not created any dummyGroups yet!</TinyTitle>
                    <Spacer height={sizes.baseMargin} />
                </Wrapper>
                <ButtonGradient
                    text="Create Group"
                    onPress={() => navigate(routes.createGroup)}
                />
            </Wrapper>
        </Wrapper>
    );
}

