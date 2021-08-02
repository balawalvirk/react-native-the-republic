import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { ComponentWrapper, MediumText, MediumTitle, ModalSwipeablePrimary, Spacer, TinyTitle, TitleInfoPrimary, UserCardPrimary, Wrapper } from '../../../components';
import { appStyles, colors, DummyData, sizes } from '../../../services';

function ShareOnPopup({ visible, toggle, onPressItem }) {
  const [selectedIndex, selectIndex] = useState(0)
  //const groups = [...DummyData.groups]
  //const data = [DummyData.userData, ...DummyData.groups]
  let data = []

  const getSetData = () => {
    let tempGroups = []
    const topItem = {
      ...DummyData.userData,
      title: 'Share on my profile',
      subTitle: 'Your followers will be able to see this post.',
    }
    for (const item of DummyData.groups) {
      const obj = {
        ...item,
        title: item.name,
        subTitle: '483 members will be able to see this post.'
      }
      tempGroups.push(obj)
    }
    return [topItem, ...tempGroups]

  }

  data = getSetData()

  return (
    <ModalSwipeablePrimary
      visible={visible}
      toggle={toggle}
      hideHeader
      topMargin={height(40)}
    >
      <Wrapper flex={1}>
        <Spacer height={sizes.baseMargin} />
        <Wrapper>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Wrapper>
                  {index === 1 ?
                    <ComponentWrapper>
                      <MediumText style={[appStyles.fontBold]}>Groups</MediumText>
                      <Spacer height={sizes.smallMargin} />
                    </ComponentWrapper>
                    :
                    null
                  }
                  <UserCardPrimary
                    onPress={() => {
                      onPressItem(item, index)
                      toggle()
                      selectIndex(index)
                    }}
                    containerStyle={[selectedIndex === index ? styles.selectedOption : styles.nonSelectedOptions, { marginBottom: sizes.marginVertical / 2 }]}
                    imageUri={item.image}
                    title={item.title}
                    subTitle={item.subTitle}
                  />
                </Wrapper>
              )
            }}
            ListFooterComponent={() => <Spacer height={sizes.doubleBaseMargin} />}
          />
        </Wrapper>
      </Wrapper>
    </ModalSwipeablePrimary>
  );
}

export default ShareOnPopup;


const styles = StyleSheet.create({
  selectedOption: {
    borderWidth: 1, borderColor: colors.appColor1, backgroundColor: colors.appColor1 + '20'
  },
  nonSelectedOptions: {
    borderWidth: 1, borderColor: colors.appBgColor3, backgroundColor: 'transparent'
  }
})