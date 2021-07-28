import React, { Component, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Rating } from 'react-native-elements';
import { ComponentWrapper, MainWrapper, NotificationCardPrimary, RegularText } from '../../../components';
import { appStyles, colors, DummyData } from '../../../services';




function Notifications(props) {
    const { navigation } = props

    const [notifications, setNotifications] = useState(DummyData.notificaitons)

    //configure Header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ComponentWrapper>
                    <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>Clear All</RegularText>
                </ComponentWrapper>
            )
        });
    }, [navigation]);
    return (
        <MainWrapper>
            <FlatList
                data={notifications}
                key={'key'}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <NotificationCardPrimary
                            containerStyle={{ backgroundColor: !item.isView ? index === notifications.length - 1 ? colors.appColor2 + '20' : colors.rating + '20' : 'transparent' }}
                            text={item.text}
                            image={item.image}
                            type={item.type}
                            time={item.time}
                        />
                    )
                }}
            />
        </MainWrapper>
    );
}

export default Notifications;
