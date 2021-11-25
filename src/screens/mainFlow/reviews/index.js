import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { MainWrapper, Reviews as RenderReviews, SkeletonPrimaryList, Spacer } from '../../../components';
import { Backend, sizes } from '../../../services';
import dummyData from '../../../services/constants/dummyData';

const Reviews = ({ navigation, route }) => {
    const { product_id } = route.params

    const [reviews, setReviews] = useState(null)
    useEffect(() => {
        getSetReviews()
    }, [])
    const getSetReviews = async() => {
        await Backend.getProductReviews(product_id).
            then(res => {
                if (res) {
                    setReviews(res.data)
                }
            })
    }

    if(!reviews){
        return(
            <SkeletonPrimaryList itemStyle={{}}/>
        )
    }
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
