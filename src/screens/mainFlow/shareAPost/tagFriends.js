import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { AbsoluteWrapper, ButtonGradient, IconButton, MainWrapper, Spacer, UserCardPrimary } from '../../../components';
import { colors, DummyData, sizes } from '../../../services';

function TagFriends(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const { getSetTaggedFriends } = route.params
    const dummyFriends = [...DummyData.users.slice()]

    const [friends, setFriends] = useState(dummyFriends)


    const onClickFriend = (item, index) => {
        let temp = friends
        let tempItem = item
        tempItem.selected = !tempItem.selected
        temp[index] = tempItem
        // temp[index].selected = !temp[index].selected
        console.log('temp[index]-->', temp)
        setFriends(temp)
    }
    return (
        <MainWrapper >
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
                            onPress={() => onClickFriend(item, index)}
                            title={item.name}
                            imageUri={item.image}
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
                        getSetTaggedFriends(friends)
                        goBack()
                    }}
                />
            </AbsoluteWrapper>
        </MainWrapper>
    );
}

export default TagFriends;
