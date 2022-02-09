import { useFocusEffect } from '@react-navigation/core';
import React, { Component, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import { ButtonColoredSmall, ButtonGroupAnimated, ComponentWrapper, MainWrapper, PopupPrimary, ProductCardSecondary, RowWrapperBasic, SmallTitle, Spacer, Wrapper, SkeletonListVerticalPrimary, Toasts, AddDataViewPrimary } from '../../../components';
import { appStyles, Backend, colors, routes, sizes } from '../../../services';
import dummyData from '../../../services/constants/dummyData';



function YourProducts(props) {
  const { navigation } = props
  const { navigate } = navigation

  //local states
  const [products, setProducts] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [allItemsLoaded, setAllItemsLoaded] = useState(false)
  const [seletedProduct, setSeletedProduct] = useState(null)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [isDeleteProductPopupVisible, setDeleteProductPopupVisibility] = useState(false)
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)

  const toggleDeleteProductPopup = () => setDeleteProductPopupVisibility(!isDeleteProductPopupVisible)

  useFocusEffect(
    React.useCallback(() => {
      GetSetMyProducts(true)
    }, [])
  )

  const GetSetMyProducts = async (isInitialData) => {
    const tempPage = isInitialData ? 1 : currentPage
    await Backend.get_user_products({ page: tempPage }).
      then(async res => {
        if (res) {
          const pre_data = !isInitialData ? products : []
          setProducts([...pre_data, ...res.data.data])
          !res.data.next_page_url ? setAllItemsLoaded(true) :
            setCurrentPage(tempPage + 1)
        }
      })
  }
  const handleLoadingMore = async () => {
    if (!allItemsLoaded) {
      setLoadingMore(true)
      await GetSetMyProducts()
      setLoadingMore(false)
    }
  }
  const handleDeleteProduct = async () => {
    setLoadingDelete(true)
    await Backend.delete_product(seletedProduct.id).
      then(res => {
        setLoadingDelete(false)
        if (res) {
          const newProducts = products.filter(item => item.id != seletedProduct.id)
          setProducts(newProducts)
          setSeletedProduct(null)
          toggleDeleteProductPopup()
          Toasts.success('Product deleted')
        }
      })

  }

  if (!products) {
    return (
      <SkeletonListVerticalPrimary />
    )
  }
  return (
    <MainWrapper>
      {
        products.length ?
          <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            key={'key'}
            //numColumns={isGridView && 2}
            ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
           // ListFooterComponent={() => <Spacer height={sizes.baseMargin} />}
            ListFooterComponent={ () => {
              return (
                  <>
                      {loadingMore ?
                          <>
                              <Spacer height={sizes.baseMargin} />
                              <SkeletonListVerticalPrimary />
                              <Spacer height={sizes.baseMargin} />

                          </>
                          :
                          <Spacer height={sizes.baseMargin} />
                      }
                  </>
              )
          }}
            keyExtractor={(item, index) => (index + 1).toString()}
            onEndReached={(data) => {
              if (!onEndReachedCalledDuringMomentum) {
                handleLoadingMore()
                setOnEndReachedCalledDuringMomentum(true)
              }
            }}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
            renderItem={({ item, index }) => {
              const { user } = item
              const isActive = item.status === 'active'
              const isCompleted = item.status === 'completed'
              const statusText = isActive ? "Order accepted" : isCompleted ? "Completed" : ''
              const images = JSON.parse(item.images)
              return (
                <ProductCardSecondary
                  onPress={() => { }}
                  animation={index <= 5 ? 'fadeInUp' : null}
                  duration={300 + (50 * (index + 1))}
                  containerstyle={
                    { marginBottom: sizes.marginVertical }
                  }
                  onPressHeart={() => { }}
                  image={images[0]}
                  description={item.title}
                  price={item.price}
                  discountedPrice={item.discounted_price}
                  rating={item.avg_rating}
                  reviewCount={item.reviews.length}
                  moreInfo={true}
                  moreInfoRight={
                    <RowWrapperBasic>
                      <ButtonColoredSmall
                        text={'Edit'}
                        buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, backgroundColor: colors.appColor1 }}
                        textStyle={[appStyles.textRegular, appStyles.textWhite]}
                        onPress={() => {
                          navigate(routes.sell, { productDetail: item })
                        }}
                      />
                      <Spacer width={sizes.marginHorizontalSmall} />
                      <ButtonColoredSmall
                        text={'Delete'}
                        buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, backgroundColor: colors.error }}
                        textStyle={[appStyles.textRegular, appStyles.textWhite]}
                        onPress={() => {
                          setSeletedProduct({
                            ...item,
                            image: images[0]
                          }),
                            toggleDeleteProductPopup()
                        }}
                      />
                    </RowWrapperBasic>
                  }
                />
              )
            }}
          />
          :
          <AddDataViewPrimary
            title={'Product'}
            onPress={() => navigate(routes.sell)}
          />
      }
      <PopupPrimary
        visible={isDeleteProductPopupVisible}
        toggle={toggleDeleteProductPopup}
        onPressButton1={handleDeleteProduct}
        onPressButton2={toggleDeleteProductPopup}
        buttonText1={'Yes'}
        buttonText2={'No'}
        button1Style={{ backgroundColor: colors.error }}
        loadingButton1={loadingDelete}
      >
        <Wrapper>
          {
            seletedProduct ?
              <ProductCardSecondary
                //onPress={() => { }}p
                image={seletedProduct.image}
                description={seletedProduct.description}
                price={seletedProduct.price}
                discountedPrice={seletedProduct.discounted_price}
                rating={seletedProduct.rating}
                reviewCount={seletedProduct.review_count}
              />
              :
              null
          }
          <Spacer height={sizes.baseMargin * 2} />
          <ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontalXLarge }}>
            <SmallTitle style={[appStyles.textCenter]}>Are you sure you want to delete this seletedProduct?</SmallTitle>
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin * 2} />
        </Wrapper>
      </PopupPrimary>
    </MainWrapper>
  );
}

export default YourProducts;
