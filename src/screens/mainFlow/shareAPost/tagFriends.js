import React, { Component, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { AbsoluteWrapper, ButtonGradient, HeaderPrimary, IconButton, LoaderPrimary, MainWrapper, NoDataViewPrimary, SkeletonPrimaryList, Spacer, UserCardPrimary, Wrapper } from '../../../components';
import { appImages, Backend, colors, DummyData, sizes } from '../../../services';
import Modal from 'react-native-modal'
function TagFriends({ visible, toggle, onPressFriend,friends }) {
    // const { navigation, route } = props
    // const { navigate, goBack } = navigation
    // const { getSetTaggedFriends } = route.params
    // const dummyFriends = [...DummyData.users.slice()]

    // const [friends, setFriends] = useState(null)

    // useEffect(() => {
    //     getSetFriends()
    // }, [])

    // const getSetFriends = () => {
    //     Backend.getFollowings().
    //         then(res => res && setFriends(res.data))
    // }

    // const onClickFriend = (item, index) => {
    //     let tempData = friends.slice()
    //     //let tempItem = item
    //     // tempItem.selected = !tempItem.selected
    //     tempData[index] = {
    //         ...item,
    //         selected: item.selected ? false : true
    //     }
    //     // tempData[index].selected = !tempData[index].selected
    //     console.log('tempData[index]-->', tempData)
    //     setFriends(tempData)
    // }
    // const getTaggedFriends = () => {
    //     let tempData = []
    //     if (friends.length) {
    //         tempData = friends.filter(item => item.selected)
    //     }
    //     return tempData
    // }
    if (!friends) {
        return (
            null
        )
    }
    return (
        <Modal
            isVisible={visible}
            style={{ margin: 0 }}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            swipeDirection="right"
            onSwipeComplete={toggle}
        >
            <MainWrapper >
                <HeaderPrimary
                    title="Tag Friends"
                    onBackPress={toggle}
                />
                <Wrapper flex={1}>
                    {
                        friends.length ?
                            <>
                                <FlatList
                                    data={friends}
                                    key={'key'}
                                    keyExtractor={(item, index) => index.toString()}
                                    ListFooterComponent={() => <Spacer height={sizes.doubleBaseMargin * 2} />}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <UserCardPrimary
                                                containerStyle={{ backgroundColor: colors.appBgColor1, borderWidth: 0, borderColor: colors.appBgColor3, marginBottom: sizes.marginVertical / 2, borderBottomWidth: 1, marginHorizontal: 0 }}
                                                subContainerStyle={{ marginHorizontal: sizes.marginHorizontal }}
                                                onPress={() => 
                                                   {
                                                    onPressFriend(item, index)
                                                   // onClickFriend(item, index)
                                                   // getSetTaggedFriends(getTaggedFriends())
                                                   }
                                                }
                                                title={item.first_name + ' ' + item.last_name}
                                                imageUri={item.profile_photo_path ? item.profile_photo_path : appImages.noUser}
                                                imageSize={totalSize(4.5)}
                                                // subTitle={'Follows you'}
                                                right={
                                                    <IconButton
                                                        iconName="check"
                                                        iconSize={totalSize(1.5)}
                                                        buttonSize={totalSize(2.5)}
                                                        buttonColor={item.selected ? colors.success : colors.appBgColor3}
                                                        iconColor={item.selected ? colors.appTextColor6 : colors.appBgColor3}
                                                    />
                                                }
                                            />
                                        )
                                    }}
                                />
                                <AbsoluteWrapper style={{ bottom: sizes.baseMargin, right: 0, left: 0 }}>
                                    <ButtonGradient
                                        text="Done"
                                        onPress={() => {
                                            toggle()
                                        }}
                                    />
                                </AbsoluteWrapper>
                            </>
                            :
                            <NoDataViewPrimary
                                title="Friends"
                            />
                    }
                </Wrapper>
            </MainWrapper>
        </Modal>
    );
}

export default TagFriends;
