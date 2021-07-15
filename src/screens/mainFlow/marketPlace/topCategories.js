import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { width } from 'react-native-dimension'
import { ImageSqareRound, Spacer, Wrapper, RegularText, IconWithText } from "../../../components"
import { appStyles, colors, sizes } from '../../../services'

function TopCategories({ data, onPressCategory, onPressViewAll }) {
    return (
        <Wrapper>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                key={'key'}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => onPressCategory(item, index)}
                        >
                            <Wrapper style={[appStyles.center, { marginLeft: sizes.marginHorizontalLarge }]}>
                                <ImageSqareRound
                                    source={{ uri: item.image }}
                                    size={width(12.5)}
                                    style={{borderRadius:sizes.smallRadius}}
                                />
                                <Spacer height={sizes.smallMargin} />
                                <RegularText>{item.title}</RegularText>
                            </Wrapper>
                        </TouchableOpacity>
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <IconWithText
                            onPress={onPressViewAll}
                            containerStyle={{ marginHorizontal: sizes.marginHorizontalLarge }}
                            direction="column"
                            iconSize={width(12)}
                            iconName="grid"
                            iconType="simple-line-icon"
                            text="View All"
                            tintColor={colors.appColor1}
                            textContainerStyle={{ marginTop: sizes.smallMargin, marginBottom: 0 }}
                            textStyle={[appStyles.textRegular]}
                        />
                    )
                }}
            />
        </Wrapper>
    )
}

export default TopCategories