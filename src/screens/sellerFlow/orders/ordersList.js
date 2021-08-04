import { ButtonColored, ButtonColoredSmall, MediumText, ProductCardSecondary, RegularText, RowWrapper, Spacer, Wrapper } from "../../../components"
import { appStyles, colors, sizes } from "../../../services"
import React from 'react'
import { FlatList } from "react-native"

export function OrdersList({ data,onPressOrder,onpressAccept,onpressCancel }) {
    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            key={'key'}
            ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
            ListFooterComponent={() => <Spacer height={sizes.baseMargin} />}
            keyExtractor={(item, index) => (index + 1).toString()}
            renderItem={({ item, index }) => {
                const { user } = item
                const isNew = item.status === 'new'
                const isActive = item.status === 'active'
                const isDelivered = item.status === 'delivered'
                const isCompleted = item.status === 'completed'
                const isCancelled = item.status === 'cancelled'
                const statusText = isNew ? "New" : isActive ? "Waiting for Shipment" : isDelivered ? "Waiting for review" : isCompleted ? "Completed" : isCancelled ? "Cancelled" : ""
                return (
                    <ProductCardSecondary
                        onPress={() => onPressOrder(item,index)}
                        animation={index <= 5 ? 'fadeInUp' : null}
                        duration={300 + (50 * (index + 1))}
                        containerstyle={
                            { marginBottom: sizes.marginVertical }
                        }
                        image={item.image}
                        description={item.description}
                        newPrice={item.new_price}
                        oldPrice={item.old_price}
                        //location={item.location}
                        rating={item.rating}
                        reviewCount={item.review_count}

                        moreInfoImage={user.image}
                        moreInfoTitle={user.name}
                        moreInfoSubTitle={'Buyer'}
                        moreInfoRight={
                            !isNew ?
                                <ButtonColoredSmall
                                    disabled
                                    text={statusText}
                                    buttonStyle={{ paddingHorizontal: sizes.marginHorizontalSmall / 2, borderRadius: 100, backgroundColor: isActive ? colors.appColor1 : isCompleted || isDelivered ? colors.success : isCancelled ? colors.error : colors.appColor1 }}
                                    textStyle={[appStyles.textRegular, appStyles.textWhite]}
                                />
                                :
                                null
                        }
                        moreInfoContainerStyle={[isNew && { marginHorizontal: sizes.marginHorizontalSmall, marginBottom: sizes.marginVertical }]}
                        moreInfo={
                            <Wrapper>
                                {
                                    isNew ?
                                        <Wrapper style={{ marginHorizontal: sizes.marginHorizontalSmall, marginTop: sizes.marginVertical / 2 }}>
                                            <RegularText style={[appStyles.textPrimaryColor, appStyles.fontBold]}>Delivery Address</RegularText>
                                            <Spacer height={sizes.smallMargin} />
                                            <MediumText>14 Wall Street, New York City, NY, USA </MediumText>
                                        </Wrapper>
                                        :
                                        null
                                }
                            </Wrapper>
                        }
                    >
                        {
                            <>
                                {
                                    isNew ?
                                        <Wrapper>
                                            <RegularText style={[appStyles.fontBold, appStyles.textCenter]}>Do you want to accept this order?</RegularText>
                                            <Spacer height={sizes.baseMargin} />
                                            <RowWrapper style={{ marginHorizontal: sizes.marginHorizontalSmall }}>
                                                <Wrapper flex={1}>
                                                    <ButtonColored
                                                        text="Accept"
                                                        buttonColor={colors.success}
                                                        buttonStyle={{ marginHorizontal: 0 }}
                                                        onPress={()=>onpressAccept(item,index)}
                                                    />
                                                </Wrapper>
                                                <Spacer width={sizes.marginHorizontal} />
                                                <Wrapper flex={1}>
                                                    <ButtonColored
                                                        text="Cancel"
                                                        buttonColor={colors.error}
                                                        buttonStyle={{ marginHorizontal: 0 }}
                                                        onPress={()=>onpressCancel(item,index)}
                                                    />
                                                </Wrapper>
                                            </RowWrapper>
                                            <Spacer height={sizes.smallMargin} />
                                        </Wrapper>
                                        :
                                        null
                                }
                            </>
                        }
                    </ProductCardSecondary>
                )
            }}
        />
    )
}