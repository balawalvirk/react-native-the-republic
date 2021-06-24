import React from 'react'
import { FlatList,TouchableOpacity } from 'react-native'
import { totalSize } from 'react-native-dimension'
import {Wrapper,RowWrapperBasic,ImageRound,RegularText,Spacer,TinyText,MediumText} from '../..'
import { appStyles, sizes } from '../../../services'
import styles from './styles'
function RenderComments({ data, onPress }) {
    return (
        <Wrapper>
            <FlatList
                data={data}
                key="key"
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const { user } = item
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={() => onPress(item, index)} style={[styles.commentContainer]}>
                            <RowWrapperBasic style={{ alignItems: null, }}>
                                <ImageRound
                                    source={{ uri: user.image }}
                                    size={totalSize(4)}
                                />
                                <Spacer width={sizes.marginHorizontalSmall} />
                                <Wrapper flex={1}>
                                    <RowWrapperBasic>
                                        <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>{user.name}
                                            <TinyText style={[appStyles.textGray]}>  {item.created_at}</TinyText>
                                        </RegularText>
                                    </RowWrapperBasic>
                                    <Spacer height={sizes.TinyMargin} />
                                    <MediumText>{item.comment}</MediumText>
                                </Wrapper>
                            </RowWrapperBasic>
                        </TouchableOpacity>
                    )
                }}
            />
        </Wrapper>
    )
}

export default RenderComments