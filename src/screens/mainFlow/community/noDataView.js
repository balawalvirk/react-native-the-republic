import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { ButtonGradient, CustomIcon, MediumText, Spacer, TinyTitle, Wrapper } from '../../../components';
import { appIcons, appStyles, routes, sizes } from '../../../services';
import { navigate } from '../../../services/navigation/rootNavigation';

function NoDataView({ tab }) {


    return (
        <Wrapper flex={1} >
            {
                tab != 'Your Groups' ?
                    <Wrapper flex={1} style={[appStyles.center]}>
                        <MediumText style={[appStyles.textGray]}> No Post Found </MediumText>
                    </Wrapper>
                    :
                    <Wrapper flex={1} style={[{ justifyContent: 'center', }]}>
                        <Wrapper style={[appStyles.center]}>
                            <CustomIcon
                                size={totalSize(20)}
                                icon={appIcons.user_connect}
                            />
                            <Spacer height={sizes.baseMargin} />
                            <TinyTitle style={[appStyles.textCenter]}>You have not created any groups yet!</TinyTitle>
                            <Spacer height={sizes.baseMargin} />
                        </Wrapper>
                        <ButtonGradient
                            text="Create Group"
                            onPress={()=>navigate(routes.createGroup)}
                        />
                    </Wrapper>
            }
        </Wrapper>
    );
}

export default NoDataView;
