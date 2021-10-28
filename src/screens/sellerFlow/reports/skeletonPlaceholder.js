import React from 'react'
import { height, width } from "react-native-dimension"
import { RowWrapperBasic, SkeletonPrimary, Spacer, Wrapper } from "../../../components"
import { sizes } from "../../../services"

export default () => {
    return (
        <Wrapper style={{}}>
            <SkeletonPrimary itemStyle={{ height: height(2.5), width: width(25) }} />
            <Spacer height={sizes.baseMargin} />
            <SkeletonPrimary itemStyle={{ height: height(3), width: width(20) }} />
            <Spacer height={sizes.smallMargin} />
            <RowWrapperBasic style={{ justifyContent: 'space-between', }}>
                <SkeletonPrimary itemStyle={{ height: height(1.5), width: width(10) }} />
                <RowWrapperBasic>
                    <SkeletonPrimary itemStyle={{ height: height(3.5), width: width(15), marginHorizontal: 0 }} />
                    <SkeletonPrimary itemStyle={{ height: height(3.5), width: width(20), marginLeft: sizes.marginHorizontalSmall }} />
                </RowWrapperBasic>
            </RowWrapperBasic>
            <Spacer height={sizes.baseMargin} />
            <SkeletonPrimary itemStyle={{ height: height(25), }} />
        </Wrapper>
    )
}