import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { height } from 'react-native-dimension';
import { ComponentWrapper, MainWrapper, NoDataViewPrimary, PopupPrimary, SkeletonListVerticalPrimary, SkeletonListVerticalSecondary, SmallTitle, Spacer, Toasts, TraningRequestCard, Wrapper } from '../../../components';
import { appStyles, Backend, DummyData, sizes } from '../../../services';
import NoDataView from '../../mainFlow/community/noDataView';

function Requests() {

  const [trainingRequests, setTrainingRequests] = useState(null)
  const [selectedTrainingRequest, setSelectedTrainingRequest] = useState(null)
  const [loadingApprove, setLoadingApprove] = useState(false)
  const [loadingDisapprove, setLoadingDisapprove] = useState(false)
  const [isRespondRequestPopupVisible, setRespondRequestPopupVisibility] = useState(false)

  const toggleRespondRequestPopup = () => setRespondRequestPopupVisibility(!isRespondRequestPopupVisible)

  //const requests = DummyData.trainingRequests
  //const request = DummyData.trainingRequests[0]


  useFocusEffect(
    React.useCallback(() => {
      GetSetTrainingRequests()
    }, [])
  )

  const GetSetTrainingRequests = () => {
    Backend.get_trainer_traning_requests().
      then(async res => {
        if (res) {
          setTrainingRequests(res.data)
        }
      })
  }

  const handleAcceptTrainingRequest = async () => {
    setLoadingApprove(true)
    await Backend.accept_traning_request({
      trainingRequest_id: selectedTrainingRequest.id,
      training_id: selectedTrainingRequest.training_id,
      user_id: selectedTrainingRequest.user_id
    }).
      then(res => {
        setLoadingApprove(false)
        if (res) {
          const newTrainingRequests = trainingRequests.filter(item => item.id != selectedTrainingRequest.id)
          setTrainingRequests(newTrainingRequests)
          setSelectedTrainingRequest(null)
          toggleRespondRequestPopup()
          Toasts.success('Request has bee approved')
        }
      })

  }

  const handleDisacceptTrainingRequest = async () => {
    setLoadingDisapprove(true)
    await Backend.reject_traning_request({
      trainingRequest_id: selectedTrainingRequest.id,
      training_id: selectedTrainingRequest.training_id,
    }).
      then(res => {
        setLoadingDisapprove(false)
        if (res) {
          const newTrainingRequests = trainingRequests.filter(item => item.id != selectedTrainingRequest.id)
          setTrainingRequests(newTrainingRequests)
          setSelectedTrainingRequest(null)
          toggleRespondRequestPopup()
          Toasts.success('Request has bee disapproved')
        }
      })

  }

  const getPendingRequests=()=>{
    let tempData=[]
    if(trainingRequests){
      if(trainingRequests.length){
        tempData=trainingRequests.filter(item=>item.status==='pending')
      }
    }
    return tempData
  }
  let pendingRequests=getPendingRequests()

  if (!trainingRequests) {
    return (
      <SkeletonListVerticalPrimary />
    )
  }
  return (
    <MainWrapper>
      {
        pendingRequests.length ?
          <FlatList
            data={pendingRequests}
            ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
            ListFooterComponent={() => <Spacer height={sizes.baseMargin} />}
            renderItem={({ item, index }) => {
              return (
                <TraningRequestCard
                  onPress={() => {
                    setSelectedTrainingRequest(item);
                    toggleRespondRequestPopup()
                  }}
                  containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
                  title={item.training.title}
                  startDate={Date()}
                  endDate={Date()}
                  userImage={item.user.profile_image}
                  userName={item.user.first_name + ' ' + item.user.last_name}
                />
              )
            }}
          />
          :
          <NoDataViewPrimary
            title="Pending Requests"
          />
      }
      <PopupPrimary
        visible={isRespondRequestPopupVisible}
        toggle={toggleRespondRequestPopup}
        onPressButton1={handleAcceptTrainingRequest}
        onPressButton2={handleDisacceptTrainingRequest}
        buttonText1={'Approve'}
        buttonText2={'Disapprove'}
        topMargin={height(35)}
        disableBackDropPress={loadingApprove || loadingDisapprove}
        disableSwipe={loadingApprove || loadingDisapprove}
        loadingButton1={loadingApprove}
        loadinButton2={loadingDisapprove}
      // button1Style={{ backgroundColor: colors.error }}
      >
        <Wrapper>
          {
            selectedTrainingRequest ?
              <TraningRequestCard
                containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
                title={selectedTrainingRequest.training.title}
                startDate={Date()}
                endDate={Date()}
                userImage={selectedTrainingRequest.user.profile_image}
                userName={selectedTrainingRequest.user.first_name + ' ' + selectedTrainingRequest.user.last_name}
              />
              :
              null
          }
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
