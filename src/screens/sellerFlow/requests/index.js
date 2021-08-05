import React, { Component, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { height } from 'react-native-dimension';
import { ComponentWrapper, MainWrapper, PopupPrimary, SmallTitle, Spacer, TraningRequestCard, Wrapper } from '../../../components';
import { appStyles, DummyData, sizes } from '../../../services';

function Requests() {

  const [isRespondRequestPopupVisible, setRespondRequestPopupVisibility] = useState(false)

  const toggleRespondRequestPopup = () => setRespondRequestPopupVisibility(!isRespondRequestPopupVisible)

  const requests = DummyData.trainingRequests
  const request = DummyData.trainingRequests[0]

  return (
    <MainWrapper>
      <FlatList
        data={requests}
        ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
        ListFooterComponent={() => <Spacer height={sizes.baseMargin} />}
        renderItem={({ item, index }) => {
          return (
            <TraningRequestCard
            onPress={toggleRespondRequestPopup}
              containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
              title={item.title}
              startDate={item.startDate}
              endDate={item.endDate}
              userImage={item.user.image}
              userName={item.user.name}
            />
          )
        }}
      />
      <PopupPrimary
        visible={isRespondRequestPopupVisible}
        toggle={toggleRespondRequestPopup}
        onPressButton1={toggleRespondRequestPopup}
        onPressButton2={toggleRespondRequestPopup}
        buttonText1={'Approve'}
        buttonText2={'Disapprove'}
        topMargin={height(35)}
        
       // button1Style={{ backgroundColor: colors.error }}
      >
        <Wrapper>
          <TraningRequestCard
            containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
            title={request.title}
            startDate={request.startDate}
            endDate={request.endDate}
            userImage={request.user.image}
            userName={request.user.name}
          />
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

export default Requests;
