import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { LineHorizontal, MediumText, RowWrapper, Wrapper } from '../../../components';
import { colors, sizes } from '../../../services';

function RecentSearches({ data, onPressItem, onPressCross }) {

    return (
        <Wrapper flex={1}>
            <FlatList
                data={data}
                key={'key'}
                keyExtractor={(item, key) => key.toString()}
                ListHeaderComponent={() => {
                    return (<LineHorizontal />)
                }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={() => onPressItem(item, index)} style={{}}>
                            <RowWrapper style={{ paddingVertical: sizes.marginVertical }}>
                                <Wrapper flex={1}>
                                    <MediumText>{item}</MediumText>
                                </Wrapper>
                                <Wrapper>
                                    <Icon
                                        name="x"
                                        type="feather"
                                        color={colors.appTextColor1}
                                        size={sizes.icons.medium}
                                        onPress={() => onPressCross(item, index)}
                                    />
                                </Wrapper>
                            </RowWrapper>
                            <LineHorizontal />
                        </TouchableOpacity>
                    )
                }}
            />
        </Wrapper>
    );
}

export default RecentSearches;
