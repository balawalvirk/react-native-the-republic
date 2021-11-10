import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { ButtonColoredSmall, MainWrapper, RowWrapperBasic, Spacer, Toasts, UserCardPrimary, Wrapper } from '../../../components';
import { appStyles, Backend, colors, DummyData, sizes } from '../../../services';


export default function MemberRequests({ navigation, route }) {
    const { setParams } = navigation
    const { requests } = route.params
    const members = [...DummyData.users, ...DummyData.users]

    //local states
    const [loadingApproveIndex, setLoadingApproveIndex] = useState(-1)
    const [loadingDisapproveIndex, setLoadingDisapproveIndex] = useState(-1)

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
                    setParams({ requests: tempRequests })
                }
            })

        // setTimeout(() => {
        //     setLoadingApproveIndex(-1)
        //     Toasts.success('Request has been approved.')
        //     // let tempRequests = requests.slice()
        //     const tempRequests = requests.filter(ite => ite = !item)
        //     setParams({ requests: tempRequests })
        // }, 2000);
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
                    setParams({ requests: tempRequests })
                }
            })

        // setTimeout(() => {
        //     setLoadingDisapproveIndex(-1)
        //     Toasts.success('Request has been disapproved.')
        //     // let tempRequests = requests.slice()
        //     const tempRequests = requests.filter(ite => ite = !item)
        //     setParams({ requests: tempRequests })
        // }, 2000);

    }

    return (
        <MainWrapper>
            {/* <MembersRequestsList
                data={requests}
                onPress={() => { }}
                handleApprove={() => { }}
                onPressDecline={() => { }}
            /> */}
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
        </MainWrapper>
    );
}


// const MembersRequestsList = ({ data, onPress, handleApprove, onPressDecline }) => {
//     return (
//         <FlatList
//             showsVerticalScrollIndicator={false}
//             data={data}
//             key={'key'}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item, index }) => {
//                 const userName = item.user.first_name + ' ' + item.user.last_name
//                 return (
//                     <UserCardPrimary
//                         containerStyle={{ backgroundColor: colors.appBgColor1, borderWidth: 0, borderColor: colors.appBgColor3, marginBottom: sizes.marginVertical / 2, borderBottomWidth: 1, marginHorizontal: 0 }}
//                         subContainerStyle={{ marginHorizontal: sizes.marginHorizontal }}
//                         onPress={() => onPress(item, index)}
//                         title={userName}
//                         imageUri={item.user.profile_image}
//                         imageSize={totalSize(4.5)}
//                         subTitle={'Follows you'}
//                         bottom={
//                             <Wrapper>
//                                 <Spacer height={sizes.smallMargin} />
//                                 <RowWrapperBasic>
//                                     <Spacer width={totalSize(5) + sizes.baseMargin} />
//                                     <ButtonColoredSmall
//                                         text="Approve"
//                                         onPress={handleApprove}
//                                         textStyle={[appStyles.textRegular, appStyles.textWhite]}
//                                         buttonStyle={[{ paddingHorizontal: sizes.marginHorizontalLarge, }]}
//                                     />
//                                     <Spacer width={sizes.marginHorizontalSmall} />
//                                     <ButtonColoredSmall
//                                         text="Disapprove"
//                                         onPress={onPressDecline}
//                                         buttonStyle={[{ paddingHorizontal: sizes.marginHorizontalLarge, backgroundColor: colors.appBgColor3 }]}
//                                         textStyle={[appStyles.textRegular]}
//                                     />
//                                 </RowWrapperBasic>
//                             </Wrapper>
//                         }
//                     />
//                 )
//             }}
//         />
//     )
// }