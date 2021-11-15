import React from 'react'
import { FlatList } from 'react-native'
import { height, totalSize } from 'react-native-dimension'
import { NoDataViewPrimary } from '..'
import { RowWrapperBasic, SkeletonListVerticalPrimary, SkeletonPrimary, Wrapper } from '../..'
import { appImages, appStyles, Backend, colors, HelpingMethods, sizes } from '../../../services'
import { ButtonColoredSmall } from '../../buttons'
import { UserCardPrimary } from '../../cards'
import { IconHeart } from '../../icons'
import { Spacer } from '../../spacers'
import styles from './styles'


export const Dealers = ({ data, onPress, onPressHeart, ListHeaderComponent, ListFooterComponent, isLoading }) => {
    return (
        <>
            {
                isLoading ?
                    <>
                        {ListHeaderComponent}
                        {[1, 2, 3, 4].map((item, index) => {
                            return (
                                <SkeletonPrimary
                                    itemStyle={{ height: height(8), marginBottom: sizes.marginVertical / 2 }}

                                />
                            )
                        })}
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
                                return (
                                    <UserCardPrimary
                                        containerStyle={{ backgroundColor: colors.appBgColor1, borderWidth: 1, borderColor: colors.appBgColor3, marginBottom: sizes.marginVertical / 2 }}
                                        onPress={() => onPress(item, index)}
                                        title={item.first_name + ' ' + item.last_name}
                                        imageUri={item.profile_image ? item.profile_image : appImages.noUser}
                                        subTitle={(index % 2 ? (index + 1) * 9 : (index + 1) * 7) + ' miles away'}
                                        right={
                                            <IconHeart
                                                size={totalSize(2)}
                                                value={HelpingMethods.checkIfDealerFavourite(item.id)}
                                                onPress={() => Backend.handleAddRemoveFavouriteDealer(item.id)}
                                            />
                                        }
                                    />
                                )
                            }}
                        />
                        :
                        <NoDataViewPrimary
                            title="Dealers"
                        />
            }
        </>

    )
}
export const Groups = ({ data, onPress, handleJoin, ListHeaderComponent, ListFooterComponent, right }) => {
    return (
        <FlatList
            data={data}
            key={'key'}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            renderItem={({ item, index }) => {
                const isJoined = index === 2 || index === 5
                return (
                    <UserCardPrimary
                        containerStyle={{ backgroundColor: colors.appBgColor1, borderWidth: 1, borderColor: colors.appBgColor3, marginBottom: sizes.marginVertical / 2 }}
                        onPress={() => onPress(item, index)}
                        title={item.name}
                        imageUri={item.icon}
                        subTitle={item.users.length + ' ' + 'member' + (item.users.length <= 1 ? '' : 's')}
                        right={
                            right ? right(item, index) :
                                isJoined ?
                                    <ButtonColoredSmall
                                        text="Joined"
                                        onPress={() => handleJoin(item, index)}
                                        buttonStyle={[styles.joinButton, { backgroundColor: colors.appColor1 + '40' }]}
                                        textStyle={[appStyles.textRegular, appStyles.textPrimaryColor]}
                                    />
                                    :
                                    <ButtonColoredSmall
                                        text="Join"
                                        onPress={() => handleJoin(item, index)}
                                        buttonStyle={[styles.joinButton,]}
                                        textStyle={[appStyles.textRegular, appStyles.textWhite]}
                                    />
                        }
                    />
                )
            }}
        />
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
                        />
            }
        </>
    )
}