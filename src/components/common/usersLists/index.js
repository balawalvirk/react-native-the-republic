import React from 'react'
import { FlatList } from 'react-native'
import { totalSize } from 'react-native-dimension'
import { RowWrapperBasic, Wrapper } from '../..'
import { appStyles, colors, sizes } from '../../../services'
import { ButtonColoredSmall } from '../../buttons'
import { UserCardPrimary } from '../../cards'
import { IconHeart } from '../../icons'
import { Spacer } from '../../spacers'
import styles from './styles'


export const Dealers = ({ data, onPress, onPressHeart, ListHeaderComponent, ListFooterComponent }) => {
    return (
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
                        title={item.name}
                        imageUri={item.image}
                        subTitle={(index % 2 ? (index + 1) * 9 : (index + 1) * 7) + ' miles away'}
                        right={
                            <IconHeart
                                size={totalSize(2)}
                                value={index === 1}
                                onPress={onPressHeart}
                            />
                        }
                    />
                )
            }}
        />
    )
}
export const Groups = ({ data, onPress, handleJoin, ListHeaderComponent, ListFooterComponent }) => {
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
                        imageUri={item.image}
                        subTitle={(index % 2 ? (index + 1) * 9 : (index + 1) * 7) + ' members'}
                        right={
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

export const FollowRequestsList = ({ data, onPress, onPressHeart, ListHeaderComponent, ListFooterComponent, onPressAccept, onPressDecline }) => {
    return (
        <FlatList
            data={data}
            key={'key'}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            renderItem={({ item, index }) => {
                return (
                    <UserCardPrimary
                        containerStyle={{ backgroundColor: colors.appBgColor1, borderWidth: 0, borderColor: colors.appBgColor3, marginBottom: sizes.marginVertical / 2, borderBottomWidth: 1, marginHorizontal: 0 }}
                        subContainerStyle={{ marginHorizontal: sizes.marginHorizontal }}
                        onPress={() => onPress(item, index)}
                        title={item.name}
                        imageUri={item.image}
                        imageSize={totalSize(4.5)}
                        subTitle={'Follows you'}
                        bottom={
                            <Wrapper>
                                <Spacer height={sizes.smallMargin} />
                                <RowWrapperBasic>
                                    <Spacer width={totalSize(5) + sizes.baseMargin} />
                                    <ButtonColoredSmall
                                        text="Accept"
                                        onPress={onPressAccept}
                                        textStyle={[appStyles.textRegular, appStyles.textWhite]}
                                        buttonStyle={[styles.followRequestsListButton]}
                                    />
                                    <Spacer width={sizes.marginHorizontalSmall} />
                                    <ButtonColoredSmall
                                        text="Decline"
                                        onPress={onPressDecline}
                                        buttonStyle={[styles.followRequestsListButton, { backgroundColor: colors.appBgColor3 }]}
                                        textStyle={[appStyles.textRegular]}
                                    />
                                </RowWrapperBasic>
                            </Wrapper>
                        }
                    />
                )
            }}
        />
    )
}