import React, { Component, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { appIcons, appStyles, HelpingMethods, routes, sizes } from '../../../services';
import { ImageRound } from '../../images';
import { LineHorizontal } from '../../lines';
import { Spacer } from '../../spacers';
import { MediumText, RegularText, TinyText } from '../../text';
import { colors } from '../../../services';
import { RowWrapper, Wrapper, ComponentWrapper, RowWrapperBasic, AbsoluteWrapper } from '../../wrappers';
import styles from './styles'
import { IconWithText, IconHeart, IconButton } from '../../icons';
import { TextInputColored } from '../../textInput';
import { ModalSwipeablePrimary } from '../../modals';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import * as RootNavigation from '../../../services/navigation/rootNavigation'
import { MenuOption, MenuPopup, RenderComments } from '..';


function Comments({ data, onPress }) {
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

function RenderPosts({ data, onPressDotsHorizontal, onPressComment, onPressSendComment, onPressLike, onPressProduct, onPressHeart, scrollEnabled, ListHeaderComponent, ListFooterComponent }) {
    //const [commentText, setCommentText] = useState('')

    return (
        <Wrapper flex={1}>
            <FlatList
                data={data}
                key={'key'}
                scrollEnabled={scrollEnabled}
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={ListFooterComponent}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const { user, product, group, images, } = item
                    // let commentText = ''
                    let commentText = []
                    return (
                        <Wrapper>
                            {
                                index === 0 ?
                                    <LineHorizontal />
                                    :
                                    null
                            }
                            <Spacer height={sizes.smallMargin} />
                            <ComponentWrapper style={[styles.smallMarginHorizontal]}>
                                <RowWrapperBasic style={{ alignItems: null, }}>
                                    <Wrapper flex={1}>
                                        <RowWrapperBasic>
                                            <ImageRound
                                                source={{ uri: user.image }}
                                                size={totalSize(5)}
                                            />
                                            <Spacer width={sizes.marginHorizontalSmall} />
                                            <Wrapper flex={1}>
                                                <RowWrapperBasic>
                                                    <RegularText style={[appStyles.fontBold]}>{user.name}</RegularText>
                                                    {
                                                        group ?
                                                            <IconWithText
                                                                text={group.name}
                                                                iconName="caretright"
                                                                iconType="antdesign"
                                                                iconSize={totalSize(1)}
                                                                textContainerStyle={{ marginHorizontal: 0 }}
                                                                iconStyle={{ marginHorizontal: sizes.marginHorizontalSmall / 2 }}
                                                                textStyle={[appStyles.textRegular, appStyles.fontBold]}
                                                            />
                                                            :
                                                            null
                                                    }
                                                </RowWrapperBasic>
                                                <Spacer height={sizes.smallMargin} />
                                                <TinyText style={[appStyles.textGray]}>{item.created_at}</TinyText>
                                            </Wrapper>
                                        </RowWrapperBasic>
                                    </Wrapper>
                                    <Wrapper>
                                        <Icon
                                            name="dots-three-horizontal"
                                            type="entypo"
                                            size={totalSize(2.25)}
                                            color={colors.appTextColor5}
                                            onPress={() => onPressDotsHorizontal(item, index)}
                                        />
                                    </Wrapper>
                                </RowWrapperBasic>
                                <Spacer height={sizes.smallMargin} />
                                <Wrapper>
                                    <MediumText>{item.description}</MediumText>
                                </Wrapper>
                                <Spacer height={sizes.smallMargin} />
                            </ComponentWrapper>
                            {
                                product ?
                                    <TouchableOpacity activeOpacity={1} onPress={() => onPressProduct(item, index)}>
                                        <Wrapper style={styles.productContainer}>
                                            <Wrapper flex={1}>
                                                <Image
                                                    source={{ uri: product.image }}
                                                    style={{ height: height(45), width: null, marginHorizontal: sizes.marginHorizontalSmall }}
                                                    resizeMode="contain"
                                                />
                                                <AbsoluteWrapper style={{ top: 0, right: 0 }}>
                                                    <IconHeart
                                                        value={HelpingMethods.checkIsProductFavourite(product.id)}
                                                        onPress={() => onPressHeart(item, index)}
                                                        containerSize={totalSize(6)}
                                                    />
                                                </AbsoluteWrapper>
                                            </Wrapper>
                                            <LineHorizontal />
                                            <Spacer height={sizes.smallMargin} />
                                            <ComponentWrapper style={[styles.smallMarginHorizontal]}>
                                                <MediumText>{product.description}</MediumText>
                                                <Spacer height={sizes.smallMargin} />
                                                <RowWrapperBasic>
                                                    <Wrapper flex={1}>
                                                        <RowWrapperBasic>
                                                            <RegularText style={[appStyles.fontBold, appStyles.textPrimaryColor]}>${product.new_price}</RegularText>
                                                            <Spacer width={sizes.smallMargin} />
                                                            <TinyText style={[appStyles.textColorError, appStyles.textLineThrough]}>${product.old_price}</TinyText>
                                                        </RowWrapperBasic>
                                                    </Wrapper>
                                                    <Wrapper>
                                                        <IconWithText
                                                            customIcon={appIcons.map_pin_outline}
                                                            text={product.location}
                                                            textStyle={[appStyles.textRegular, appStyles.textLightGray]}
                                                            iconSize={totalSize(1.25)}
                                                            tintColor={appStyles.textLightGray.color}
                                                        />
                                                    </Wrapper>
                                                </RowWrapperBasic>
                                            </ComponentWrapper>
                                            <Spacer height={sizes.smallMargin} />
                                        </Wrapper>
                                        <Spacer height={sizes.smallMargin} />
                                        <LineHorizontal height={0.5} />
                                    </TouchableOpacity>
                                    :
                                    null
                            }

                            {
                                images.length ?
                                    <Wrapper>
                                        <FlatList
                                            data={images}
                                            horizontal
                                            nestedScrollEnabled
                                            scrollEnabled={true}
                                            keyExtractor={(item, index) => index?.toString()}
                                            contentContainerStyle={{ flexGrow: 1 }}
                                            // onViewableItemsChanged={this.onViewableItemsChanged}
                                            viewabilityConfig={{
                                                itemVisiblePercentThreshold: 50,
                                            }}
                                            pagingEnabled={true}
                                            // onScroll={(index) => { console.log('current index is ===>', index) }}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => {
                                                let imageHieght
                                                let imageWidth
                                                let isPortraitImage = false
                                                imageHieght = Image.getSize(item, (width, height) => { return height })
                                                imageWidth = Image.getSize(item, (width, height) => { return width })
                                                // console.log('Image height: ',imageHieght,' width : ',imageWidth)
                                                if (imageHieght > imageWidth) { isPortraitImage = true }
                                                return (
                                                    <TouchableOpacity
                                                        style={{ backgroundColor: 'transparent', width: width(100) }}
                                                        onPress={() => { }}
                                                        activeOpacity={1}>
                                                        <Image
                                                            source={{ uri: item }}
                                                            style={{ flex: 1, height: height(35), width: null }}
                                                            resizeMode='contain'
                                                        />
                                                    </TouchableOpacity>
                                                );
                                            }}
                                        />
                                    </Wrapper>
                                    : null
                            }

                            <Spacer height={sizes.smallMargin} />
                            <RowWrapper style={{ marginHorizontal: sizes.marginHorizontalXLarge }}>
                                <IconWithText
                                    iconName="thumb-up"
                                    text={item.like_counts}
                                    tintColor={HelpingMethods.checkIsPostLiked(item.id) ? appStyles.textLightGray.color : appStyles.textPrimaryColor.color}
                                    onPress={() => onPressLike(item, index)}
                                />
                                <IconWithText
                                    customIcon={appIcons.comment}
                                    text={item.comment_counts}
                                    tintColor={appStyles.textLightGray.color}
                                />
                                <IconWithText
                                    customIcon={appIcons.share}
                                    text={'Share'}
                                    tintColor={appStyles.textLightGray.color}
                                />
                            </RowWrapper>
                            <Spacer height={sizes.smallMargin} />
                            <LineHorizontal height={0.5} />
                            <Spacer height={sizes.smallMargin} />
                            <TextInputColored
                                placeholder="Write a comment..."
                                iconNameRight="send"
                                iconTypeRight="feather"
                                value={commentText[index]}
                                //onChangeText={text => setCommentText(text)}
                                onChangeText={text => {
                                    commentText[index] = text,
                                        console.log('commentText[index]-->', commentText[index] = text)
                                }}
                                iconColorRight={colors.appColor1}
                                containerStyle={styles.smallMarginHorizontal}
                                onPressIcon={() => onPressSendComment(item, index, commentText[index])}
                                left={
                                    <Wrapper>
                                        <IconButton
                                            iconName="camera"
                                            iconType="feather"
                                            iconSize={totalSize(2)}
                                            buttonSize={totalSize(4)}
                                            buttonColor={colors.appColor1 + '20'}
                                            buttonStyle={{ marginLeft: sizes.marginHorizontalSmall }}
                                            onPress={() => { }}
                                        />
                                    </Wrapper>
                                }
                                inputStyle={{ paddingHorizontal: sizes.marginHorizontalSmall }}
                            />
                            <Spacer height={sizes.smallMargin} />
                            <RenderComments
                                data={item.comments}
                                onPress={(item, index) => onPressComment(item, index)}
                            />
                            <Spacer height={sizes.smallMargin} />

                            <LineHorizontal color={colors.appBgColor3} height={sizes.smallMargin} />
                        </Wrapper>
                    )
                }}
            />
        </Wrapper>
    );
}

function Posts({ data, scrollEnabled, ListFooterComponent, ListHeaderComponent }) {
    const { navigate } = RootNavigation
    //Menu Options
    const commentMenuOptions = ['View User Profile', 'Delete Comment', 'Report Comment']
    const postMenuOptions = ['View User Profile', 'Delete Post', 'Report Post']
    //manage objects
    const [selectedPostForMenu, setPostForMenu] = useState({})
    const [selectedCommentForMenu, setCommentForMenu] = useState({})

    //manage menues
    const [isCommentMenuVisible, setCommentMenuVisibility] = useState(false)
    const [isPostMenuVisible, setPostMenuVisibility] = useState(false)

    const toggleCommentMenu = () => setCommentMenuVisibility(!isCommentMenuVisible)
    const togglePostMenu = () => setPostMenuVisibility(!isPostMenuVisible)
    return (
        <>
            <RenderPosts
                data={data}
                scrollEnabled={scrollEnabled}
                ListFooterComponent={ListFooterComponent}
                ListHeaderComponent={ListHeaderComponent}
                onPressComment={(item, index) => {
                    setCommentForMenu(item)
                    toggleCommentMenu()
                }}
                onPressDotsHorizontal={(item, index) => {
                    setPostForMenu(item)
                    togglePostMenu()
                }}
                onPressLike={(item, index) => { }}
                onPressSendComment={(item, index, commentText) => { }}
                onPressProduct={(item, index) => navigate(routes.productDetail, { product: item.product })}
                onPressHeart={(item, index) => { }}
            />
            <MenuPopup
                options={postMenuOptions}
                visible={isPostMenuVisible}
                toggle={togglePostMenu}
                onPressOption={(title, index) => {
                    //Your logic here base on item or index
                    togglePostMenu()
                    if (index === 0) {
                        navigate(routes.userProfile, { item: selectedPostForMenu.user })
                    } else if (index === 1) {
                        navigate(routes.notifications, { item: selectedPostForMenu })
                    } else if (index === 2) {
                        navigate(routes.notifications, { item: selectedPostForMenu })
                    }
                }}
            />
            <MenuPopup
                options={commentMenuOptions}
                visible={isCommentMenuVisible}
                toggle={toggleCommentMenu}
                onPressOption={(title, index) => {
                    //Your logic here base on item or index
                    toggleCommentMenu()
                    if (index === 0) {
                        navigate(routes.userProfile, { item: selectedCommentForMenu.user })
                    } else if (index === 1) {
                        navigate(routes.notifications, { item: selectedCommentForMenu })
                    } else if (index === 2) {
                        navigate(routes.notifications, { item: selectedCommentForMenu })
                    }
                }}
            />
        </>
    )
}

export default Posts;
