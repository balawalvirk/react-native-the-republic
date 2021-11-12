import React, { Component, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { height, totalSize } from 'react-native-dimension';
import { ButtonColoredSmall, MainWrapper, NoDataViewPrimary, RowWrapperBasic, SkeletonListVerticalPrimary, SkeletonPrimary, SkeletonPrimaryList, Spacer, Toasts, UserCardPrimary, Wrapper } from '../../../components';
import { appStyles, Backend, colors, DummyData, sizes } from '../../../services';


export default function MemberRequests({ navigation, route }) {
    const { setParams } = navigation
    const { group_id } = route.params
    const members = [...DummyData.users, ...DummyData.users]

    //local states
    const [requests, setRequests] = useState(null)
    const [loadingApproveIndex, setLoadingApproveIndex] = useState(-1)
    const [loadingDisapproveIndex, setLoadingDisapproveIndex] = useState(-1)

    useEffect(() => {
        getSetRequests()
    }, [])

    const getSetRequests = async () => {
        await Backend.getGroupJoinReuqests(group_id).
            then(res => {
                if (res) {
                    setRequests(res.data)
                }
            })
    }


    const handleApprove = async (item, index) => {
        setLoadingApproveIndex(index)
        await Backend.acceptGroupJoinReuqest({
            group_id: item.group_id,
            groupRequest_id: item.id
        }).
            then(res => {
                setLoadingApproveIndex(-1)
                if (res) {
                    Toasts.success('Request has been approved.')
                    // let tempRequests = requests.slice()
                    const tempRequests = requests.filter(ite => ite != item)
                    //setParams({ requests: tempRequests })
                    setRequests(tempRequests)
                }
            })
    }

    const handleDisapprove = async (item, index) => {
        setLoadingDisapproveIndex(index)
        await Backend.declineGroupJoinReuqest({
            group_id: item.group_id,
            groupRequest_id: item.id
        }).
            then(res => {
                setLoadingDisapproveIndex(-1)
                if (res) {
                    Toasts.success('Request has been disapproved.')
                    // let tempRequests = requests.slice()
                    const tempRequests = requests.filter(ite => ite != item)
                    // setParams({ requests: tempRequests })
                    setRequests(tempRequests)
                }
            })
    }

    if (!requests) {
        return (
            <SkeletonListVerticalPrimary
                itemHeight={height(5)}
            />
        )
    }
    return (
        <MainWrapper>

            {
                requests.length ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={requests}
                        key={'key'}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            const userName = item.user.first_name + ' ' + item.user.last_name
                            return (
                                <UserCardPrimary
                                    containerStyle={{ backgroundColor: colors.appBgColor1, borderWidth: 0, borderColor: colors.appBgColor3, marginBottom: sizes.marginVertical / 2, borderBottomWidth: 1, marginHorizontal: 0 }}
                                    subContainerStyle={{ marginHorizontal: sizes.marginHorizontal }}
                                    //onPress={() => onPress(item, index)}
                                    title={userName}
                                    imageUri={item.user.profile_image}
                                    imageSize={totalSize(4.5)}
                                    subTitle={'Follows you'}
                                    bottom={
                                        <Wrapper>
                                            <Spacer height={sizes.smallMargin} />
                                            <RowWrapperBasic>
                                                <Spacer width={totalSize(5) + sizes.baseMargin} />
                                                <ButtonColoredSmall
                                                    text="Approve"
                                                    onPress={() => handleApprove(item, index)}
                                                    textStyle={[appStyles.textRegular, appStyles.textWhite]}
                                                    buttonStyle={[{ paddingHorizontal: sizes.marginHorizontalLarge, }]}
                                                    isLoading={loadingApproveIndex === index}
                                                />
                                                <Spacer width={sizes.marginHorizontalSmall} />
                                                <ButtonColoredSmall
                                                    text="Disapprove"
                                                    onPress={() => handleDisapprove(item, index)}
                                                    buttonStyle={[{ paddingHorizontal: sizes.marginHorizontalLarge, backgroundColor: colors.appBgColor3 }]}
                                                    textStyle={[appStyles.textRegular]}
                                                    isLoading={loadingDisapproveIndex === index}
                                                    tintColor={colors.appTextColor1}
                                                />
                                            </RowWrapperBasic>
                                        </Wrapper>
                                    }
                                />
                            )
                        }}
                    />
                    :
                    <NoDataViewPrimary
                        title="Member Requests"
                    />
            }
        </MainWrapper>
    );
}


