import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import { ButtonGroupAnimated, MainWrapper } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';

const tabs = [
    {
        title: 'All',

    },
    {
        title: 'Active'
    },
    {
        title: 'Completed'
    }
]

function PurchaseHistory() {
    //local states
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)


    return (
        <MainWrapper>
            <ButtonGroupAnimated
                data={tabs}
                initalIndex={selectedTabIndex}
                text='title'
                onPressButton={(item, index) => setSelectedTabIndex(index)}
                containerStyle={[{ backgroundColor: 'transparent', marginHorizontal: 0 }]}
                inActiveButtonStyle={{ width: width(100) / 3, paddingVertical: height(1.75), backgroundColor: 'transparent', paddingHorizontal: 0, marginLeft: 0, marginRight: 0 }}
                activeButtonForceStyle={{ position: 'absolute', height: 4, bottom: 0, backgroundColor: colors.appColor1, borderRadius: 5, width: (width((100 / 3) - 10)), left: width(5) }}
                // activeButtonContent={<Wrapper></Wrapper>}
                activeTextStyle={[appStyles.textMedium, appStyles.textPrimaryColor]}
                inActiveTextStyle={[appStyles.textMedium, appStyles.textLightGray]}

            />
        </MainWrapper>
    );
}

export default PurchaseHistory;
