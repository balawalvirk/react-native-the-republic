import React from 'react';
import { Text, View } from 'react-native';
import { MainWrapper, Reviews as RenderReviews, Spacer } from '../../../components';
import { sizes } from '../../../services';
import dummyData from '../../../services/constants/dummyData';

const Reviews = (props) => {

    const reviews = dummyData.reviews.slice().concat(dummyData.reviews)
    return (
        <MainWrapper>
            <RenderReviews
                data={reviews}
                ListFooterComponent={() => <Spacer height={sizes.doubleBaseMargin} />}
                ListHeaderComponent={() => <Spacer height={sizes.smallMargin} />}
            />
        </MainWrapper>
    )
};

export default Reviews;
