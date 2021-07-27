import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { height, width } from 'react-native-dimension';
import { ButtonGroupAnimated, MainWrapper, OrdersPrimary, Spacer } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';
import dummyData from '../../../services/constants/dummyData';

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

function PurchaseHistory(props) {
    const { navigation } = props
    const { navigate } = navigation

    //local states
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [orders, setOrders] = useState(dummyData.orders)

    const filterOrders = () => {
        let tempOrders = []
        tempOrders = orders.filter(item => {
            return (
                selectedTabIndex === 0 ? item.status === 'active' || item.status === 'completed' :
                    selectedTabIndex === 1 ? item.status === 'active' :
                        selectedTabIndex === 2 ? item.status === 'completed' : null
            )
        })
        return tempOrders
    }


    let filteredOrders = []
    filteredOrders = filterOrders()

    return (
        <MainWrapper>
            <ButtonGroupAnimated
                data={tabs}
                initalIndex={selectedTabIndex}
                text='title'
                onPressButton={(item, index) => setSelectedTabIndex(index)}
                containerStyle={[{ backgroundColor: 'transparent', marginHorizontal: 0,borderBottomWidth:1,borderBottomColor:colors.appBgColor4 }]}
                inActiveButtonStyle={{ width: width(100) / 3, paddingVertical: height(1.75), backgroundColor: 'transparent', paddingHorizontal: 0, marginLeft: 0, marginRight: 0 }}
                activeButtonForceStyle={{ position: 'absolute', height: 4, bottom: 0, backgroundColor: colors.appColor1, borderRadius: 5, width: (width((100 / 3) - 10)), left: width(5) }}
                // activeButtonContent={<Wrapper></Wrapper>}
                activeTextStyle={[appStyles.textMedium, appStyles.textPrimaryColor]}
                inActiveTextStyle={[appStyles.textMedium, appStyles.textLightGray]}

            />
            <OrdersPrimary
                data={filteredOrders}
                onPressItem={(item, index) => { }}
                ListHeaderComponent={()=><Spacer height={sizes.baseMargin}/>}
            />
        </MainWrapper>
    );
}

export default PurchaseHistory;
