import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { BackIcon, ButtonGradient, ComponentWrapper, LargeText, LineHorizontal, MainWrapper, PlanCard, RegularText, RowWrapperBasic, SmallTitle, Spacer, TinyTitle, TitleValue, Wrapper } from '../../../../components';
import { appStyles, colors, DummyData, fontFamily, HelpingMethods, routes, sizes } from '../../../../services';


function SelectSubscriptionPlan(props) {
  const { navigation } = props
  const { navigate, goBack } = navigation



  const [selectedIndex, selectIndex] = useState(-1)
  const subscriptionPlans = DummyData.subscriptionPlans

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <ComponentWrapper style={{ marginLeft: Platform.OS === 'ios' ? sizes.marginHorizontal : sizes.marginHorizontal / 2 }}>
          <BackIcon
            onPress={() => {
              // HelpingMethods.handleAnimation()
              selectedIndex < 0 ?
                goBack() :
                selectIndex(-1)
            }}
          />
        </ComponentWrapper>
      )
    });
  }, [navigation, selectedIndex]);


  let selectedPlan = {}
  if (selectedIndex >= 0) {
    selectedPlan = subscriptionPlans[selectedIndex]
  }

  return (
    <MainWrapper>

      {
        selectedIndex < 0 ?
          <Wrapper>
            <FlatList
              data={subscriptionPlans}
              ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
              renderItem={({ item, index }) => {
                const isSelected = selectedIndex === index
                return (
                  <PlanCard
                    onPress={() => {
                      //selectIndex(index),
                      //  HelpingMethods.handleAnimation()
                      index != 0 && selectIndex(index)
                    }}
                    title={item.title}
                    price={item.price === 0 ? 'Free' : '$' + item.price + '/month'}
                    keyPoints={item.keyPoints}
                    isSelected={selectedIndex === index}
                  />
                )
              }}
            />
          </Wrapper>
          :
          <Wrapper flex={1}>
         <Wrapper flex={1}>
         <Spacer height={sizes.baseMargin} />
            <PlanCard
              onPress={() => {
                //selectIndex(index),
                //index != 0 && navigate(routes.upgradeSubscriptionPlan, { selectedPlan: selectedPlan })
              }}
              title={selectedPlan.title}
              price={'$' + selectedPlan.price + '/month'}
              keyPoints={selectedPlan.keyPoints}
              isSelected
            //isSelected={selectedIndex === index}
            />
            <ComponentWrapper>
              <LineHorizontal color={colors.appBgColor4} />
            </ComponentWrapper>
            <Spacer height={sizes.baseMargin} />
            <TitleValue
              title={'Subtotal'}
              value={'$ ' + selectedPlan.price + ".00"}
            />
            <Spacer height={sizes.baseMargin} />
            <TitleValue
              title={'Tax (10%)'}
              value={'$ 4.99'}
            />
            <Spacer height={sizes.baseMargin} />
            <TitleValue
              title={'Transaction Charges'}
              value={'$ 10.00'}
            />
            <Spacer height={sizes.baseMargin} />
            <Wrapper style={[appStyles.grayWrapper, { paddingVertical: sizes.baseMargin * 1.5 }]}>
              <RowWrapperBasic>
                <Wrapper flex={1}>
                  <SmallTitle>Total</SmallTitle>
                </Wrapper>
                <SmallTitle style={[appStyles.textPrimaryColor]}>$ 64.44</SmallTitle>
              </RowWrapperBasic>
            </Wrapper>
            <Spacer height={sizes.baseMargin} />
         </Wrapper>
            <Wrapper>
              <Spacer height={sizes.doubleBaseMargin} />
              <ButtonGradient
                text="Proceed to Payment"
                onPress={() => navigate(routes.subscriptionPayment,{plan:selectedPlan})}

              />
              <Spacer height={sizes.doubleBaseMargin} />
            </Wrapper>


          </Wrapper>
      }
    </MainWrapper>
  );
}

export default SelectSubscriptionPlan;
