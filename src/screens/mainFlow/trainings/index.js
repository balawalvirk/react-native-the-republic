import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { MainWrapper, Spacer, TraningCard } from '../../../components';
import { DummyData, sizes } from '../../../services';

function Trainings() {

    const trainings = DummyData.trainings
    return (
        <MainWrapper>
            <FlatList
                data={trainings}
                key={'key'}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={()=><Spacer height={sizes.baseMargin}/>}
                renderItem={({ item, index }) => {
                    return (
                        <TraningCard
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
