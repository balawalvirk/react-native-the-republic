import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import { ButtonColoredSmall, ButtonGroupAnimated, ComponentWrapper, MainWrapper, Purchases, PopupPrimary, ProductCardSecondary, RowWrapperBasic, SmallTitle, Spacer, Wrapper } from '../../../components';
import { appStyles, colors, routes, sizes } from '../../../services';
import dummyData from '../../../services/constants/dummyData';



function YourProducts(props) {
  const { navigation } = props
  const { navigate } = navigation

  //local states
  const [products, setProducts] = useState(dummyData.products)
  const [isDeleteProductPopupVisible, setDeleteProductPopupVisibility] = useState(false)

  const toggleDeleteProductPopup = () => setDeleteProductPopupVisibility(!isDeleteProductPopupVisible)

  const product = products[0]
  return (
    <MainWrapper>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        key={'key'}
        //numColumns={isGridView && 2}
        ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
        ListFooterComponent={() => <Spacer height={sizes.baseMargin} />}
        keyExtractor={(item, index) => (index + 1).toString()}
        renderItem={({ item, index }) => {
          const { user } = item
          const isActive = item.status === 'active'
          const isCompleted = item.status === 'completed'
          const statusText = isActive ? "Order accepted" : isCompleted ? "Completed" : ''
          return (
            <ProductCardSecondary
              onPress={() => { }}
              animation={index <= 5 ? 'fadeInUp' : null}
              duration={300 + (50 * (index + 1))}
              containerstyle={
                { marginBottom: sizes.marginVertical }
              }
              onPressHeart={() => { }}
              image={item.image}
              description={item.description}
              newPrice={item.new_price}
              oldPrice={item.old_price}
              rating={item.rating}
              reviewCount={item.review_count}
              moreInfo={true}
              moreInfoRight={
                <RowWrapperBasic>
                  <ButtonColoredSmall
                    text={'Edit'}
                    buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, backgroundColor: colors.appColor1 }}
                    textStyle={[appStyles.textRegular, appStyles.textWhite]}
                    onPress={() => { }}
                  />
                  <Spacer width={sizes.marginHorizontalSmall} />
                  <ButtonColoredSmall
                    text={'Delete'}
                    buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, backgroundColor: colors.error }}
                    textStyle={[appStyles.textRegular, appStyles.textWhite]}
                    onPress={toggleDeleteProductPopup}
                  />
                </RowWrapperBasic>
              }
            />
          )
        }}
      />
      <PopupPrimary
        visible={isDeleteProductPopupVisible}
        toggle={toggleDeleteProductPopup}
        onPressButton1={toggleDeleteProductPopup}
        onPressButton2={toggleDeleteProductPopup}
        buttonText1={'Yes'}
        buttonText2={'No'}
        button1Style={{backgroundColor: colors.error}}
      >
       <Wrapper>
       <ProductCardSecondary
          //onPress={() => { }}p
          image={product.image}
          description={product.description}
          newPrice={product.new_price}
          oldPrice={product.old_price}
          rating={product.rating}
          reviewCount={product.review_count}
        />
        <Spacer height={sizes.baseMargin*2}/>
        <ComponentWrapper style={{marginHorizontal:sizes.marginHorizontalXLarge}}>
          <SmallTitle style={[appStyles.textCenter]}>Are you sure you want to delete this product?</SmallTitle>
        </ComponentWrapper>
        <Spacer height={sizes.baseMargin*2}/>
       </Wrapper>
      </PopupPrimary>
    </MainWrapper>
  );
}

export default YourProducts;
