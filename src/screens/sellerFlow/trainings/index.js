import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { height } from 'react-native-dimension';
import { ComponentWrapper, MainWrapper, TraningSellerCard, PopupPrimary, SmallTitle, Spacer, TraningRequestCard, Wrapper, ButtonColoredSmall, MediumText, LoaderPrimary, SkeletonListVerticalPrimary, AddDataViewPrimary } from '../../../components';
import { appStyles, Backend, colors, DummyData, routes, sizes } from '../../../services';

function Trainings(props) {
  const { navigation } = props
  const { navigate } = navigation

  const [loadingDelete, setLoadingDelete] = useState(false)
  const [selectedTraining, setSelectedTraining] = useState(null)


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
  const [trainings, setTrainings] = useState(null)

  const toggleDeleteTrainingPopup = () => setDeleteTrainingPopupVisibility(!isDeleteTraningPopupVisible)

  //const trainings = DummyData.trainings
  useFocusEffect(
    React.useCallback(() => {
      // !userToken ? null :  Backend.GetAllNotifications()
      Backend.get_user_tranings().
        then(res => {
          if (res) {
            setTrainings(res.trainings)
          }
        })
    }, [])
  );

  const handleDeleteTraining = async () => {
    setLoadingDelete(true)
    await Backend.delete_tranings({ training_id: selectedTraining.id }).
      then(res => {
        if (res) {
          setLoadingDelete(false)
          const newTrainings = trainings.filter(item => item.id != selectedTraining.id)
          setTrainings(newTrainings)
          toggleDeleteTrainingPopup()
          setSelectedTraining(null)
        }
      })
  
  }

  if (trainings === null) {
    return (<SkeletonListVerticalPrimary />)
  }
  return (
    <MainWrapper>
      {trainings.length ?
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
                onPressDelete={() => {
                  setSelectedTraining(item)
                  toggleDeleteTrainingPopup()
                }}
              />
            )
          }}
        />
        :
        // <Wrapper flex={1} style={[appStyles.center]}>
        //   <MediumText>No Trainings Found</MediumText>
        // </Wrapper>
        <AddDataViewPrimary
        title={'A Training Now'}
        onPress={() => navigate(routes.seller.createTrainin)}
      />
      }
      <PopupPrimary
        visible={isDeleteTraningPopupVisible}
        toggle={toggleDeleteTrainingPopup}
        onPressButton1={handleDeleteTraining}
        onPressButton2={toggleDeleteTrainingPopup}
        buttonText1={'Yes'}
        buttonText2={'No'}
        topMargin={height(65)}
        loadingButton1={loadingDelete}
        button1Style={{ backgroundColor: colors.error }}
      //title="Are you sure you want to delete this training?"

      // button1Style={{ backgroundColor: colors.error }}
      >
        <Wrapper>
          <Spacer height={sizes.baseMargin * 2} />
          <ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontalXLarge }}>
            <SmallTitle style={[appStyles.textCenter]}>Are you sure you want to delete this training?</SmallTitle>
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin * 2} />
        </Wrapper>
      </PopupPrimary>
    </MainWrapper>
  );
}

export default Trainings;
