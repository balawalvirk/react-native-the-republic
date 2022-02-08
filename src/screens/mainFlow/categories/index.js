import React, { Component, useState } from 'react';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { height } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { MainWrapper, SearchTextinput, Spacer, TextInputColored, TinyTitle, Wrapper } from '../../../components';
import { appStyles, colors, DummyData, routes, sizes } from '../../../services';



function Categories(props) {
    const { navigate } = props.navigation
    const allCategories = [...DummyData.categories, ...DummyData.categories]

    //redux states
    const product = useSelector(state => state.product)
    const { categories } = product

    //local states
    const [searchQuery, setSearchQuery] = useState('')
    let filteredCategories = []

    //local methods
    const getFilteredCategories = () => {
        let tempData = []
        const query = searchQuery.toLowerCase()
        tempData = categories.filter(item => {
            const name = item.name.toLowerCase()
            return (
                name.includes(query)
            )
        })
        return tempData
    }


    if (searchQuery.length) {
        filteredCategories = getFilteredCategories()
    } else {
        filteredCategories = categories
    }
    return (
        <MainWrapper>
            <Spacer height={sizes.baseMargin} />
            <SearchTextinput
                value={searchQuery}
                onChangeText={(text) => { setSearchQuery(text) }}
                placeholder="Search Categories"
            />
            <Spacer height={sizes.baseMargin} />
            <RenderAllCategories
                data={filteredCategories}
                onPressCategory={(item, index) => { navigate(routes.CategoryDetail, { category:item }) }}
            />
        </MainWrapper>
    );
}

export default Categories;


function RenderAllCategories({ data, onPressCategory }) {



    return (
        <Wrapper flex={1}>
            <FlatList
                data={data}
                key="key"
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => onPressCategory(item, index)}
                            style={{ flex: 1, marginHorizontal: sizes.marginHorizontal, borderRadius: sizes.cardRadius, borderWidth: 1, borderColor: colors.appBgColor3, marginBottom: sizes.marginVertical / 2, ...{ marginRight: (index + 1) % 2 ? 0 : null, marginleft: !(index + 1) % 2 ? 0 : null } }}>
                            <Image
                                source={{ uri: item.image }}
                                style={{ flex: 1, height: height(20), width: null, borderTopRightRadius: sizes.cardRadius, borderTopLeftRadius: sizes.cardRadius }}
                            />
                            <Wrapper style={[appStyles.center, { paddingHorizontal: sizes.marginHorizontalSmall, paddingVertical: sizes.marginVertical / 2, }]}>
                                <TinyTitle style={[appStyles.textCenter]}>{item.name}</TinyTitle>
                            </Wrapper>
                        </TouchableOpacity>
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <Spacer height={sizes.doubleBaseMargin} />
                    )
                }}
            />
        </Wrapper>
    )
}