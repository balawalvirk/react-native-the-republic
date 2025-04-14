import React, { Component, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { useDispatch, useSelector } from 'react-redux';
import { ComponentWrapper, MediumText, MediumTitle, ModalSwipeablePrimary, Spacer, TinyTitle, TitleInfoPrimary, UserCardPrimary, Wrapper } from '../../../components';
import { appImages, appStyles, Backend, colors, DummyData, sizes } from '../../../services';
import { setMyGroups, setMyJoinedGroups } from '../../../services/store/actions';

function ShareOnPopup({ visible, toggle, onPressItem, selectedGroupId }) {

  //redux states
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const group = useSelector(state => state.group)
  const { userDetail } = user
  //const { myGroups, myJoinedGroups } = group

  //local states
  const [selectedIndex, selectIndex] = useState(0)
  const [relatedGroups, setRelatedGroups] = useState(null)
  //const data = [DummyData.userData, ...DummyData.groups]
  let data = []

  useEffect(() => {
    getSetSelectedGroup()
  }, [selectedGroupId, relatedGroups])

  useEffect(() => {
    getSetGroups()
  }, [])

  const getSetGroups = async () => {
    let myGroups = []
    let joinedGroups = []
    await Backend.getUserGroups().
      then(res => {
        if (res) {
          // dispatch(setMyGroups(res.data))
          myGroups = res.data
        }
      })
    await Backend.getJoinedGroups().
      then(res => {
        if (res) {
          // dispatch(setMyJoinedGroups(res.data.joined_groups))
          console.log('getJoinedGroups --> ', res.data.joined_groups)
          joinedGroups = res.data.joined_groups
        }
      })
    setRelatedGroups([...myGroups, ...joinedGroups])
  }

  const getSetSelectedGroup = () => {
    if (selectedGroupId && relatedGroups) {
      const tempData = getSetData()
      const tempObj = tempData.find(item => item.id === selectedGroupId)
      if (tempObj) {
        const tempIndex = tempData.indexOf(tempObj)
        if (tempIndex >= 0) {
          selectIndex(tempIndex)
        }
      }
    }
  }
  const getSetData = () => {
    let tempGroups = []
    const topItem = {
      image: userDetail.profile_photo_path ? userDetail.profile_photo_path : appImages.noUser,
      title: 'Share on my profile',
      subTitle: 'Your followers will be able to see this post.',
      id: null
    }
    // for (const item of [...myGroups, ...myJoinedGroups]) {
    for (const item of [...relatedGroups]) {
      const obj = {
        image: item.icon,
        title: item.name,
        subTitle: (item.users ? item.users.length : 0) + ' members will be able to see this post.',
        id: item.id
      }
      tempGroups.push(obj)
    }
    return [topItem, ...tempGroups]

  }

  if (relatedGroups) {
    data = getSetData()
  }

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