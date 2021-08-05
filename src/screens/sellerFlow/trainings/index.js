import React, { Component, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { height } from 'react-native-dimension';
import { ComponentWrapper, MainWrapper, TraningSellerCard, PopupPrimary, SmallTitle, Spacer, TraningRequestCard, Wrapper, ButtonColoredSmall } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';

function Trainings(props) {
  const { navigation } = props
  const { navigate } = navigation


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ComponentWrapper>
          <ButtonColoredSmall
            text="Create Training"
            iconName="plus"
            buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: colors.appColor2 }}
            onPress={() => navigate(routes.seller.createTrainin)}
          />
        </ComponentWrapper>
      )
    });
  }, [navigation]);

  const [isDeleteTraningPopupVisible, setDeleteTrainingPopupVisibility] = useState(false)

  const toggleDeleteTrainingPopup = () => setDeleteTrainingPopupVisibility(!isDeleteTraningPopupVisible)

  const trainings = DummyData.trainings

  return (
    <MainWrapper>
      <FlatList
        data={trainings}
        ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
        ListFooterComponent={() => <Spacer height={sizes.baseMargin} />}
        renderItem={({ item, index }) => {
          return (
            <TraningSellerCard
              onPress={() => { }}
              containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
              title={item.title}
              duration={item.duration}
              charges={item.charges}
              onPressEdit={() => { navigate(routes.seller.createTrainin, { training: item }) }}
              onPressDelete={toggleDeleteTrainingPopup}
            />
          )
        }}
      />
      <PopupPrimary
        visible={isDeleteTraningPopupVisible}
        toggle={toggleDeleteTrainingPopup}
        onPressButton1={toggleDeleteTrainingPopup}
        onPressButton2={toggleDeleteTrainingPopup}
        buttonText1={'Yes'}
        buttonText2={'No'}
        topMargin={height(60)}
        button1Style={{ backgroundColor: colors.error }}
      //title="Are you sure you want to delete this training?"

      // button1Style={{ backgroundColor: colors.error }}
      >
        <Wrapper>

          <Spacer height={sizes.baseMargin * 2} />
          <ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontalXLarge }}>
            <SmallTitle style={[appStyles.textCenter]}>Do you want to accept this training request?</SmallTitle>
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin * 2} />
        </Wrapper>
      </PopupPrimary>
    </MainWrapper>
  );
}

export default Trainings;
