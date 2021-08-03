import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { ButtonColoredSmall, MainWrapper, RowWrapperBasic, Spacer, UserCardPrimary, Wrapper } from '../../../components';
import { appStyles, colors, DummyData, sizes } from '../../../services';

const MembersList = ({ data, onPress, onPressAccept, onPressDecline }) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            key={'key'}
            keyExtractor={(item, index) => index.toString()}
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
                                        text="Approve"
                                        onPress={onPressAccept}
                                        textStyle={[appStyles.textRegular, appStyles.textWhite]}
                                        buttonStyle={[{ paddingHorizontal: sizes.marginHorizontalLarge, }]}
                                    />
                                    <Spacer width={sizes.marginHorizontalSmall} />
                                    <ButtonColoredSmall
                                        text="Disapprove"
                                        onPress={onPressDecline}
                                        buttonStyle={[{ paddingHorizontal: sizes.marginHorizontalLarge, backgroundColor: colors.appBgColor3 }]}
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
function MemberRequests() {
    const members = [...DummyData.users, ...DummyData.users]

    return (
        <MainWrapper>
            <MembersList
                data={members}
                onPress={() => { }}
                onPressAccept={() => { }}
                onPressDecline={() => { }}
            />
        </MainWrapper>
    );
}

export default MemberRequests;
