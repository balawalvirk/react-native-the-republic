import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { MainWrapper, Spacer, TraningCard } from '../../../components';
import { DummyData, routes, sizes } from '../../../services';

function Trainings(props) {
    const { navigate } = props.navigation
    const trainings = DummyData.trainings
    return (
        <MainWrapper>
            <FlatList
                data={trainings}
                key={'key'}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => <Spacer height={sizes.baseMargin} />}
                renderItem={({ item, index }) => {
                    return (
                        <TraningCard
                        containerStyle={{ marginBottom: sizes.marginVertical / 2 }}
                            onPress={() => navigate(routes.selectDateTime, { training:item })}
                            title={item.title}
                            description={item.description}
                            duration={item.duration}
                            charges={item.charges}
                            location={item.location}
                            userName={item.user.name}
                            userImage={item.user.image}
                            userRating={4.6}
                            userReviewsCount={'234'}
                        />
                    )
                }}
            />
        </MainWrapper>
    );
}

export default Trainings;
