import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { MainWrapper, RowWrapper, RowWrapperBasic, SkeletonPrimary, Spacer, Wrapper } from '../../../components';
import { appStyles, sizes } from '../../../services';

// function Skeleton() {


//     return (
//         <MainWrapper>
//             <Spacer height={sizes.baseMargin} />
//             <RowWrapperBasic >
//                 {
//                     [1, 2, 3, 4, 5].map((item, index) => {
//                         return (
//                             <Wrapper style={[{ width: width(12.5), marginLeft: sizes.marginHorizontalLarge }]}>
//                                 <SkeletonPrimary
//                                     itemStyle={{ marginHorizontal: 0, height: width(12.5) }}
//                                 />
//                                 <Spacer height={5} />
//                                 <SkeletonPrimary
//                                     itemStyle={{ marginHorizontal: 0, height: 7.5, }}
//                                 />
//                             </Wrapper>
//                         )
//                     })
//                 }
//             </RowWrapperBasic>
//             {
//                 [1, 2, 3].map((item, index) => {
//                     return (
//                         <Wrapper>
//                             <Spacer height={sizes.doubleBaseMargin} />
//                             <RowWrapper style={{ alignItems: 'flex-start', }}>
//                                 <SkeletonPrimary
//                                     itemStyle={{ marginHorizontal: 0, width: width(20), height: totalSize(2), }}
//                                 />
//                                 <SkeletonPrimary
//                                     itemStyle={{ marginHorizontal: 0, width: width(10), height: totalSize(1.25), }}
//                                 />
//                             </RowWrapper>
//                             <Spacer height={sizes.baseMargin} />
//                             <RowWrapperBasic style={{}}>
//                                 {
//                                     [1, 2, 3, 4, 5].map((item, index) => {
//                                         return (
//                                             <Wrapper style={[{ width: width(37.5), marginLeft: sizes.marginHorizontal }]}>
//                                                 <SkeletonPrimary
//                                                     itemStyle={{ marginHorizontal: 0, height: height(30) }}
//                                                 />
//                                             </Wrapper>
//                                         )
//                                     })
//                                 }
//                             </RowWrapperBasic>
//                         </Wrapper>
//                     )
//                 })
//             }
//             <Spacer height={sizes.baseMargin} />

//         </MainWrapper>
//     );
// }

// export default Skeleton;


export const CategoriesSkeleton = () => {
    return (
        <RowWrapperBasic >
            {
                [1, 2, 3, 4, 5].map((item, index) => {
                    return (
                        <Wrapper style={[{ width: width(12.5), marginLeft: sizes.marginHorizontalLarge }]}>
                            <SkeletonPrimary
                                itemStyle={{ marginHorizontal: 0, height: width(12.5) }}
                            />
                            <Spacer height={5} />
                            <SkeletonPrimary
                                itemStyle={{ marginHorizontal: 0, height: 7.5, }}
                            />
                        </Wrapper>
                    )
                })
            }
        </RowWrapperBasic>
    )
}

export const PostTypesSkeleton = () => {
    return (
      
                <Wrapper>
                    <Spacer height={sizes.doubleBaseMargin} />
                    <RowWrapper style={{ alignItems: 'flex-start', }}>
                        <SkeletonPrimary
                            itemStyle={{ marginHorizontal: 0, width: width(20), height: totalSize(2), }}
                        />
                        <SkeletonPrimary
                            itemStyle={{ marginHorizontal: 0, width: width(10), height: totalSize(1.25), }}
                        />
                    </RowWrapper>
                    <Spacer height={sizes.baseMargin} />
                    <RowWrapperBasic style={{}}>
                        {
                            [1, 2, 3].map((item, index) => {
                                return (
                                    <Wrapper style={[{ width: width(37.5), marginLeft: sizes.marginHorizontal }]}>
                                        <SkeletonPrimary
                                            itemStyle={{ marginHorizontal: 0, height: height(30) }}
                                        />
                                    </Wrapper>
                                )
                            })
                        }
                    </RowWrapperBasic>
                </Wrapper>
    )
}