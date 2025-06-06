import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { height, totalSize } from 'react-native-dimension'
import { RowWrapperBasic, SkeletonListVerticalPrimary, NoDataViewPrimary, UserSkeletons, Wrapper, SkeletonPrimary } from '../..'
import { appImages, appStyles, Backend, colors, HelpingMethods, sizes } from '../../../services'
import { ButtonColoredSmall } from '../../buttons'
import { UserCardPrimary } from '../../cards'
import { IconHeart } from '../../icons'
import { Spacer } from '../../spacers'
import styles from './styles'


export const Dealers = ({ data, onPress, onPressHeart, ListHeaderComponent, ListFooterComponent, isLoading, disableNoDataView, onEndReached, isLoadingMore }) => {
    //local states
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)
    return (
        <>
            {
                isLoading ?
                    <>
                        {() => ListHeaderComponent}
                        <UserSkeletons />
                    </>
                    :
                    data.length ?
                        <FlatList
                            data={data}
                            key={'key'}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={ListHeaderComponent}
                            // ListFooterComponent={ListFooterComponent}
                            onEndReached={(data) => {
                                if (!onEndReachedCalledDuringMomentum) {
                                    if (onEndReached) {
                                        onEndReached(data)
                                        setOnEndReachedCalledDuringMomentum(true)
                                    }
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
                            renderItem={({ item, index }) => {
                                return (
                                    <UserCardPrimary
                                        containerStyle={{ backgroundColor: colors.appBgColor1, borderWidth: 1, borderColor: colors.appBgColor3, marginBottom: sizes.marginVertical / 2 }}
                                        onPress={() => onPress(item, index)}
                                        title={item.first_name + ' ' + item.last_name}
                                        imageUri={item.profile_image ? item.profile_image : appImages.noUser}
                                        // subTitle={(index % 2 ? (index + 1) * 9 : (index + 1) * 7) + ' miles away'}
                                        subTitle={item.distance_round >= 0 ? HelpingMethods.getRoundedValue(item.distance_round) + ' miles away' : ''}
                                        right={
                                            <IconHeart
                                                size={totalSize(2)}
                                                value={HelpingMethods.checkIfDealerFavourite(item.id)}
                                                onPress={() => {
                                                    Backend.handleAddRemoveFavouriteDealer(item.id)
                                                    onPressHeart && onPressHeart(item, index)
                                                }}
                                            />
                                        }
                                    />
                                )
                            }}
                            ListFooterComponent={ListFooterComponent ? ListFooterComponent : () => {
                                return (
                                    <>
                                        {isLoadingMore ?
                                            <>
                                                <Spacer height={sizes.baseMargin} />
                                                <UserSkeletons />
                                                <Spacer height={sizes.baseMargin} />

                                            </>
                                            :
                                            null
                                        }
                                    </>
                                )
                            }}
                        />
                        :
                        !disableNoDataView ?
                            <NoDataViewPrimary
                                title="Dealers"
                            />
                            :
                            null
            }
        </>

    )
}
export const Groups = ({ data, onPress, handleJoin, ListHeaderComponent, ListFooterComponent, right, isLoading, disableNoDataView }) => {
    return (
        <>
            {
                isLoading ?
                    <>
                        {() => ListHeaderComponent}
                        <UserSkeletons />
                    </>
                    :
                    data.length ?
                        <FlatList
                            data={data}
                            key={'key'}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={ListHeaderComponent}
                            ListFooterComponent={ListFooterComponent}
                            renderItem={({ item, index }) => {
                                const isJoined = HelpingMethods.checkIfGroupJoined(item.id)
                                const isJoinRequested = HelpingMethods.checkIfGroupJoinRequested(item.id)
                                const joinBtnText = HelpingMethods.checkIfGroupJoinRequested(item.id) ? 'Join Request Sent' : HelpingMethods.checkIfGroupJoined() ? 'Joined' : 'Join'
                                return (
                                    <UserCardPrimary
                                        containerStyle={{ backgroundColor: colors.appBgColor1, borderWidth: 1, borderColor: colors.appBgColor3, marginBottom: sizes.marginVertical / 2 }}
                                        onPress={() => onPress(item, index)}
                                        title={item.name}
                                        imageUri={item.icon}
                                        subTitle={item.users ? item.users.length + ' ' + 'member' + (item.users.length <= 1 ? '' : 's') : ''}
                                        right={
                                            right ? right(item, index) :
                                                <ButtonColoredSmall
                                                    text={joinBtnText}
                                                    onPress={() => { }}
                                                    buttonStyle={[styles.joinButton, { backgroundColor: isJoined ? (colors.appColor1 + '40') : isJoinRequested ? colors.appBgColor4 : colors.appColor1 }]}
                                                    textStyle={[appStyles.textRegular, isJoinRequested ? appStyles.textGray : isJoined ? appStyles.textPrimaryColor : { color: colors.appTextColor6 }]}
                                                />

                                        }
                                    />
                                )
                            }}
                        />
                        :
                        !disableNoDataView ?
                            <NoDataViewPrimary
                                title="Groups"
                            />
                            :
                            null
            }
        </>
    )
}

export const FollowRequestsList = ({ data, onPress, loading, ListHeaderComponent, ListFooterComponent, onPressAccept, onPressDecline, loadingAcceptIndex, loadingDeclineIndex }) => {
    return (
        <>
            {
                loading ?
                    <>
                        <SkeletonListVerticalPrimary
                            itemHeight={height(7)}
                        />
                    </>
                    :
                    data.length ?
                        <FlatList
                            data={data}
                            key={'key'}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={ListHeaderComponent}
                            ListFooterComponent={ListFooterComponent}
                            renderItem={({ item, index }) => {
                                const { user } = item
                                const userName = user.first_name + ' ' + user.last_name
                                const userImage = user.profile_image ? user.profile_image : appImages.noUser
                                return (
                                    <UserCardPrimary
                                        containerStyle={{ backgroundColor: colors.appBgColor1, borderWidth: 0, borderColor: colors.appBgColor3, marginBottom: sizes.marginVertical / 2, borderBottomWidth: 1, marginHorizontal: 0 }}
                                        subContainerStyle={{ marginHorizontal: sizes.marginHorizontal }}
                                        onPress={() => onPress(item, index)}
                                        title={userName}
                                        imageUri={userImage}
                                        imageSize={totalSize(4.5)}
                                        subTitle={'Follows you'}
                                        bottom={
                                            <Wrapper>
                                                <Spacer height={sizes.smallMargin} />
                                                <RowWrapperBasic>
                                                    <Spacer width={totalSize(5) + sizes.baseMargin} />
                                                    <ButtonColoredSmall
                                                        text="Accept"
                                                        onPress={() => onPressAccept(item, index)}
                                                        textStyle={[appStyles.textRegular, appStyles.textWhite]}
                                                        buttonStyle={[styles.followRequestsListButton]}
                                                        isLoading={loadingAcceptIndex === index}
                                                    />
                                                    <Spacer width={sizes.marginHorizontalSmall} />
                                                    <ButtonColoredSmall
                                                        text="Decline"
                                                        onPress={() => onPressDecline(item, index)}
                                                        buttonStyle={[styles.followRequestsListButton, { backgroundColor: colors.appBgColor3 }]}
                                                        textStyle={[appStyles.textRegular]}
                                                        tintColor={colors.appTextColor1}
                                                        isLoading={loadingDeclineIndex === index}
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
                            title="Follow Request"
                            showIcon
                            iconName="deleteusergroup"
                            iconType="antdesign"
                        />
            }
        </>
    )
}