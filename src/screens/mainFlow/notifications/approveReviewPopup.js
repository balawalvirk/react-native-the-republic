import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { ProductCardSecondary, PopupPrimary, ReviewCardPrimary, Spacer, Wrapper, ComponentWrapper, SmallTitle } from '../../../components';
import { appStyles, DummyData, sizes } from '../../../services';

function ApproveReviewPopup({ visible, toggle }) {

    const review = DummyData.reviews[0]
    const product = DummyData.products[0]
    return (
        <PopupPrimary
            visible={visible}
            toggle={toggle}
            buttonText1="Approve"
            buttonText2="Disapprove"
            onPressButton1={toggle}
            onPressButton2={toggle}
            topMargin={height(30)}
        >
            <Wrapper>
                <ProductCardSecondary
                    image={product.image}
                    description={product.description}
                    discountedPrice={product.new_price}
                    price={product.old_price}
                    rating={product.rating}
                    reviewCount={product.review_count}
                />
                <Spacer height={sizes.baseRadius} />
                <ReviewCardPrimary
                    imageUrl={review.user.image}
                    title={review.user.name}
                    rating={review.rating}
                    comment={review.comment}
                    date={review.date}
                />
                <Spacer height={sizes.doubleBaseMargin} />
                <ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontalXLarge }}>
                    <SmallTitle style={[appStyles.textCenter]}>Do you want to accept this rating & review?</SmallTitle>
                </ComponentWrapper>
                <Spacer height={sizes.doubleBaseMargin} />
            </Wrapper>
        </PopupPrimary>
    );
}

export default ApproveReviewPopup;
