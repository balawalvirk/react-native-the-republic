import React from 'react'
import { FlatList } from "react-native";
import { totalSize, width } from "react-native-dimension";
import { Icon } from "react-native-elements";
import { colors, sizes } from "../../../services";
import { AddButton } from "../../buttons";
import { IconButton } from '../../icons';
import { ImageSqareRound } from "../../images";
import { AbsoluteWrapper, ComponentWrapper, RowWrapperBasic, Wrapper, } from "../../wrappers";
export const ImagesPrimary = ({ onPressAdd, images, onPressCross,imageSize }) => {
    const defaultSize=width(25)
    return (
        <Wrapper>
            <FlatList
                horizontal
               // scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                data={images}
                renderItem={({ item, index }) => {
                    return (
                        <Wrapper
                            style={[
                                {
                                    marginLeft:
                                        index === 0 ? sizes.marginHorizontal : null,
                                    marginRight: width(2.5),
                                },
                            ]}
                            animation="fadeInLeft"
                            duration={250 + (index + 1) * 25}>
                            <ImageSqareRound
                                size={imageSize?imageSize:defaultSize}
                                source={{ uri: item.uri }}
                                style={{borderWidth:1,borderColor:colors.appBgColor4}}
                            />
                            <AbsoluteWrapper
                                style={{
                                    top: sizes.TinyMargin,
                                    left: sizes.TinyMargin,
                                }}>
                                {/* <Icon
                                    name="closecircle"
                                    type="antdesign"
                                    color={colors.error}
                                    size={sizes.icons.medium}
                                    onPress={() => onPressCross(item, index)}
                                /> */}
                                <IconButton
                                iconName={'x'}
                                iconType={"feather"}
                                buttonColor={colors.error}
                                iconColor={colors.appTextColor6}
                                iconSize={totalSize(2)}
                                buttonSize={totalSize(3)}
                                onPress={() => onPressCross(item, index)}
                                />
                            </AbsoluteWrapper>
                        </Wrapper>
                    );
                }}
                ListFooterComponent={() =>
                    <AddButton
                        //  onPress={() => { this.imageUpload2() }}
                        onPress={onPressAdd}
                        style={[images.length ? {marginRight:sizes.marginHorizontalSmall} : { marginHorizontal: sizes.marginHorizontal }]}
                        buttonSize={imageSize?imageSize:defaultSize}
                        size={totalSize(5)}
                    />
                }
            />
        </Wrapper>
    );
};