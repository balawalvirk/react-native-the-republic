import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { MainWrapper, RowWrapper, RowWrapperBasic, SkeletonPrimary, Spacer, Wrapper } from '../../../components';
import { appStyles, sizes } from '../../../services';

function Skeleton() {


    return (
        <MainWrapper>
            <RowWrapper style={{ flexWrap: 'wrap', }}>
                {
                    [1, 2, 3, 4, 5, 6].map((item, index) => {
                        return (
                            <SkeletonPrimary
                                itemStyle={{ marginHorizontal: 0, width: width(42.5), height: height(35),marginVertical:sizes.marginVertical/2 }}
                            />
                        )
                    })
                }
            </RowWrapper>
        </MainWrapper>
    );
}

export default Skeleton;
