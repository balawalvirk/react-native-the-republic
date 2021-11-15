import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { totalSize } from 'react-native-dimension'
import { Wrapper, RowWrapperBasic, ImageRound, RegularText, Spacer, TinyText, MediumText, ImageSqareRound } from '../..'
import { appImages, appStyles, HelpingMethods, sizes } from '../../../services'
import styles from './styles'
function RenderComments({ data, onPress }) {
    return (
        <Wrapper>
            <FlatList
                data={data}
                key="key"
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <Spacer height={sizes.smallMargin} />}
                renderItem={({ item, index }) => {
                    const user = item.user ? item.user : null
                    const userImage = user ? user.profile_image ? user.profile_image : appImages.noUser : appImages.noUser
                    const fullname = user ? user.first_name + ' ' + user.last_name : 'Anonymouse'
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={() => onPress(item, index)} style={[styles.commentContainer]}>
                            <RowWrapperBasic style={{ alignItems: null, }}>
                                <ImageRound
                                    source={{ uri: userImage }}
                                    size={totalSize(4)}
                                />
                                <Spacer width={sizes.marginHorizontalSmall} />
                                <Wrapper flex={1}>
                                    <RowWrapperBasic>
                                        <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>{fullname}
                                            <TinyText style={[appStyles.textGray]}>  {HelpingMethods.formateDateComment(item.created_at)}</TinyText>
                                        </RegularText>
                                    </RowWrapperBasic>
                                    <Spacer height={sizes.TinyMargin} />
                                    <MediumText>{item.comment}</MediumText>
                                    {
                                        item.image ?
                                            <>
                                                <Spacer height={sizes.TinyMargin} />
                                                <ImageSqareRound
                                                    source={{ uri: item.image }}
                                                    size={totalSize(5)}
                                                />
                                            </>
                                            :
                                            null
                                    }
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