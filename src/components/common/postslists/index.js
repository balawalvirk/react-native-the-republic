import React, { Component, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { appIcons, appImages, appStyles, Backend, HelpingMethods, routes, sizes } from '../../../services';
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
import { MenuOption, MenuPopup, NoDataViewPrimary, PopupPrimary, RenderComments } from '..';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { PostSkeletons, Toasts } from '../..';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { MaterialIndicator } from 'react-native-indicators';
import * as ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetail } from '../../../services/store/actions';



export function Posts({
    data, scrollEnabled, ListFooterComponent,
    ListHeaderComponent, isLoadingMore, isLoading,
    onEndReached, updateData, showAllComments, enableComment,
    NumOfSkeletonItems, onPressPost
}) {
    const { navigate } = RootNavigation


    //redux states
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user)
    const { userDetail } = userData

    //Manage Menu Options
    const myCommentMenuOptions = ['Delete Comment',]
    const userCommentMenuOptions = ['View User Profile', 'Report Comment']
    let commentMenuOptions = []
    const myPostMenuOptions = ['Delete Post',]
    const userPostMenuOptions = ['View User Profile', 'Report Post']
    let postMenuOptions = []

    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)
    //manage objects
    const [selectedPostForMenu, setPostForMenu] = useState(null)
    const [selectedCommentForMenu, setCommentForMenu] = useState(null)
    const isMyPost = selectedPostForMenu ? userDetail.id === selectedPostForMenu.user_id : false
    const isMyComment = selectedCommentForMenu ? userDetail.id === selectedCommentForMenu.user_id : false
    postMenuOptions = isMyPost ? myPostMenuOptions : userPostMenuOptions
    commentMenuOptions = isMyComment ? myCommentMenuOptions : userCommentMenuOptions
    //manage menues
    const [isCommentMenuVisible, setCommentMenuVisibility] = useState(false)
    const [isPostMenuVisible, setPostMenuVisibility] = useState(false)
    const [isDeletePostPopupVisible, setDeletePostPopupVisibility] = useState(false)
    const [isLoadingDeletePost, setLoadingDeletePost] = useState(false)

    const toggleCommentMenu = () => setCommentMenuVisibility(!isCommentMenuVisible)
    const togglePostMenu = () => setPostMenuVisibility(!isPostMenuVisible)
    const toggleDeletePostPopupMenu = () => setDeletePostPopupVisibility(!isDeletePostPopupVisible)

    let postRef = []

    const handleSendComment = async (item, index, comment, image) => {
        // postRef[index].commentInputRef.current.blur()
        const post_id = item.id
        postRef[index].setLoadingSendComment(true)
        await Backend.addCommentToPost({ post_id, comment, image }).
            then(res => {
                if (res) {
                    postRef[index].setCommentText('')
                    postRef[index].setCommentImage(null)
                    postRef[index].setLoadingSendComment(false)
                    postRef[index].commentInputRef.current.blur()
                    if (updateData) {
                        let tempPosts = data.slice()
                        const newComment = res.data
                        const newComments = [...item.comments, newComment]
                        tempPosts[index] = {
                            ...item,
                            comments: newComments
                        }

                        updateData(tempPosts)
                    }
                }
            })
    }


    const handleReactOnPost = async (item, index) => {
        const post_id = item.id
        if (!HelpingMethods.checkIsPostLiked(post_id)) {
            if (updateData) {
                // const newReaction = { id:1111,user_id: userDetail.id, post_id, reaction: 'like',created_at:Date.now(),updated_at:Date.now() }
                // let tempPosts = data.slice()
                // const newReactions = [...item.reactions, newReaction]
                // tempPosts[index] = {
                //     ...item,
                //     reactions: newReactions
                // }
                // console.log('newReactions --> ',newReactions)
                //updateData(tempPosts)

                const old_reacted_posts = userDetail.reacted_posts ? userDetail.reacted_posts : []
                console.log('old_reacted_posts --> ', old_reacted_posts)
                const reacted_posts = [...old_reacted_posts, post_id]
                console.log('reacted_posts --> ', reacted_posts)
                dispatch(setUserDetail({ ...userDetail, reacted_posts }))
            }
            await Backend.addReactionToPost({ post_id, reaction: 'like' }).
                then(res => {
                    if (res) {
                        if (updateData) {
                            const newReaction = res.data
                            let tempPosts = data.slice()
                            const newReactions = [...item.reactions, newReaction]
                            tempPosts[index] = {
                                ...item,
                                reactions: newReactions
                            }
                            console.log('newReactions --> ', newReactions)
                            updateData(tempPosts)

                            // const old_reacted_posts=userDetail.reacted_posts?userDetail.reacted_posts:[]
                            // console.log('old_reacted_posts --> ',old_reacted_posts)
                            // const reacted_posts = [...old_reacted_posts, post_id]
                            // console.log('reacted_posts --> ',reacted_posts)
                            // dispatch(setUserDetail({ ...userDetail, reacted_posts }))
                        }
                    }
                })
        } else {
            let tempReactionId = ''
            let tempReactions = item.reactions
            const tempReactionObj = tempReactions.find(reaction => reaction.user_id === userDetail.id)
            if (tempReactionObj) {
                tempReactionId = tempReactionObj.id
                //tempReactionId = 1111
                if (updateData) {
                    let tempPosts = data.slice()
                    const newReactions = item.reactions.filter(reaction => reaction.id != tempReactionId)
                    tempPosts[index] = {
                        ...item,
                        reactions: newReactions
                    }
                    console.log('newReactions --> ', newReactions)
                    updateData(tempPosts)
                    const reacted_posts = userDetail.reacted_posts.filter(postId => postId != post_id)
                    console.log('new_reacted_posts --> ', reacted_posts)
                    dispatch(setUserDetail({ ...userDetail, reacted_posts }))
                }
                if (tempReactionId) {
                    await Backend.deleteReactionOfPost(tempReactionId).
                        then(res => {
                            if (res) {
                            }
                        })
                }
            }

        }

    }

    const handleDeleteComment = async () => {
        // postRef[index].commentInputRef.current.blur()
        const comment_id = selectedCommentForMenu.id
        const post_id = selectedCommentForMenu.post_id
        console.log('post_id --> ', post_id)
        if (updateData) {
            let tempPosts = data.slice()
            console.log('tempPosts --> ', tempPosts)
            const tempPostObj = tempPosts.find(item => item.id === post_id)
            console.log('tempPostObj --> ', tempPostObj)
            if (tempPostObj) {
                const tempPostIndex = tempPosts.indexOf(tempPostObj)
                console.log('tempPostIndex --> ', tempPostIndex)
                if (tempPostIndex >= 0) {
                    const newComments = tempPostObj.comments.filter(item => item.id != comment_id)
                    tempPosts[tempPostIndex] = {
                        ...tempPostObj,
                        comments: newComments
                    }
                    updateData(tempPosts)
                }
            }
            // const newComment = res.data

        }
        await Backend.deleteCommentOfPost({ comment_id }).
            then(res => {
                if (res) {

                }
            })
    }
    const handleDeletePost = async () => {
        // toggleDeletePostPopupMenu()
        // if (updateData) {
        //     let tempPostsData = data.slice()
        //     //tempPostsData = tempPostsData.filter(item => item.id != selectedPostForMenu.id)
        //     console.log('Delete selectedPostForMenu --> ', selectedPostForMenu.id)
        //     console.log('Delete tempPostsData --> ', tempPostsData)
        //     updateData(tempPostsData)
        // }

         setLoadingDeletePost(true)
         await Backend.deletePost(selectedPostForMenu.id).
             then(res => {
                 setLoadingDeletePost(false)
                 toggleDeletePostPopupMenu()
                 if (res) {
                     if (updateData) {
                         let tempPostsData = data.slice()
                         tempPostsData = tempPostsData.filter(item => item.id != selectedPostForMenu.id)
                         console.log('Delete tempPostsData --> ', tempPostsData)
                         updateData(tempPostsData)
                     }
                     Toasts.success('Post has been deleted')
                 }
             })
    }

    return (
        <>
            {
                !isLoading ?
                    data.length ?

                        <FlatList
                            keyboardShouldPersistTaps='handled'
                            data={data}
                            key={'key'}
                            scrollEnabled={scrollEnabled}
                            ListHeaderComponent={ListHeaderComponent}
                            ListFooterComponent={
                                isLoadingMore ? () => {
                                    return (
                                        <>
                                            <Spacer height={sizes.smallMargin} />
                                            <PostSkeletons NumOfItems={1} />
                                            <Spacer height={sizes.smallMargin} />
                                        </>
                                    )
                                } :
                                    ListFooterComponent
                            }
                            onEndReached={(data) => {
                                if (!onEndReachedCalledDuringMomentum) {
                                    if (onEndReached) {
                                        onEndReached(data)
                                        setOnEndReachedCalledDuringMomentum(true)
                                    }
                                }
                            }}
                            ItemSeparatorComponent={() => <LineHorizontal color={colors.appBgColor3} height={sizes.smallMargin} />}
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                const { user, product, group, images, } = item
                                return (
                                    <PostCard
                                        ref={ref => postRef[index] = ref}
                                        onPressPost={
                                            onPressPost ?
                                                () => { onPressPost(item, index) } :
                                                () => navigate(routes.postDetail, { post: item, postId: item.id, })
                                        }
                                        onPressUser={() => navigate(routes.userProfile, { userId: item.user.id })}
                                        onPressGroup={() => navigate(routes.groupDetail, { groupId: item.group.id })}
                                        item={item}
                                        index={index}
                                        onPressComment={(comment, index) => {
                                            setCommentForMenu(comment)
                                            toggleCommentMenu()
                                        }}
                                        onEndReached={onEndReached}
                                        onPressDotsHorizontal={() => {
                                            setPostForMenu(item)
                                            togglePostMenu()
                                        }}
                                        onPressLike={() => handleReactOnPost(item, index)}
                                        onPressSendComment={(comment, image) => handleSendComment(item, index, comment, image)}
                                        onPressProduct={() => navigate(routes.productDetail, { product: item.product })}
                                        onPressHeart={() => Backend.handleAddRemoveFavouriteProduct(product.id)}
                                        showAllComments={showAllComments}
                                        showLineSeparator={index === 0 && data.length > 1}
                                        enableComment={enableComment}
                                        onPressShare={() => HelpingMethods.handleShare('url')}
                                    />
                                )
                            }}
                        />
                        :
                        <NoDataViewPrimary
                            title="Posts"
                        />
                    :
                    <PostSkeletons NumOfItems={NumOfSkeletonItems ? NumOfSkeletonItems : 2} />
            }
            <MenuPopup
                options={postMenuOptions}
                visible={isPostMenuVisible}
                toggle={togglePostMenu}
                onPressOption={(title, index) => {
                    //Your logic here base on item or index
                    togglePostMenu()
                    if (title === 'View User Profile') {
                        navigate(routes.userProfile, { userId: selectedPostForMenu.user.id })
                    } else if (title === 'Delete Post') {
                        setTimeout(() => {
                            toggleDeletePostPopupMenu()
                        }, 500);
                    } else if (title === 'Report Post') {
                        navigate(routes.reportContent, { post: selectedPostForMenu })
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
                    if (title === 'View User Profile') {
                        navigate(routes.userProfile, { userId: selectedCommentForMenu.user_id })
                    } else if (title === 'Delete Comment') {
                        handleDeleteComment()
                    } else if (title === 'Report Comment') {
                        navigate(routes.reportContent, { comment: selectedCommentForMenu })
                    }
                }}
            />
            <PopupPrimary
                visible={isDeletePostPopupVisible}
                toggle={toggleDeletePostPopupMenu}
                title="Are you sure you want to delete this post"
                info="Your post will be deleted permanently and will never be recovered"
                buttonText1="Yes"
                buttonText2="No"
                onPressButton1={handleDeletePost}
                onPressButton2={toggleDeletePostPopupMenu}
                loadingButton1={isLoadingDeletePost}
                button1Style={{ backgroundColor: colors.error }}
                topMargin={height(65)}
            />
        </>
    )
}



export const PostCard = React.forwardRef(({
    onPressDotsHorizontal,
    onPressComment, onPressSendComment, onPressLike, onPressProduct,
    onPressHeart, index, item, showAllComments, showLineSeparator,
    enableComment, onPressUser, onPressPost, onPressGroup, onPressShare
}, ref) => {

    useImperativeHandle(ref, () => ({
        setCommentImage,
        setCommentText,
        setLoadingSendComment,
        commentInputRef
    }));

    const cameraMenuRef = useRef(null)
    const commentInputRef = useRef(null)

    //local states
    const [commentText, setCommentText] = useState('')
    const [commentImage, setCommentImage] = useState('')
    const [loadingSendComment, setLoadingSendComment] = useState(false)

    const options = {
        title: 'Select Photo',
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
        // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const launchImagePicker = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                if (!response.fileName) response.fileName = 'profile_image';
                const tempFile = {
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                }
                setCommentImage(tempFile)
            }
        });
    }
    const launchCamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                if (!response.fileName) response.fileName = 'profile_image';
                const tempFile = {
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                }
                setCommentImage(tempFile)
            }
        });
    }
    const { user, product, group, images, comments } = item
    const postImages = images ? JSON.parse(images) : null
    const postComments = showAllComments ? comments : comments.length ? [comments[comments.length - 1]] : []
    return (
        <Wrapper>
            {
                showLineSeparator ?
                    <LineHorizontal />
                    :
                    null
            }

            <Spacer height={sizes.smallMargin} />
            <ComponentWrapper style={[styles.smallMarginHorizontal]}>
                <RowWrapperBasic style={{ alignItems: null, }}>
                    <Wrapper flex={1}>
                        <TouchableOpacity activeOpacity={1}
                            onPress={onPressUser}
                        >
                            <RowWrapperBasic>
                                <ImageRound
                                    source={{ uri: user.profile_image ? user.profile_image : appImages.noUser }}
                                    size={totalSize(5)}
                                />
                                <Spacer width={sizes.marginHorizontalSmall} />
                                <Wrapper flex={1}>
                                    <RowWrapperBasic>
                                        <RegularText style={[appStyles.fontBold]}>{user.first_name + ' ' + user.last_name}</RegularText>
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
                                                    onPress={onPressGroup}
                                                />
                                                :
                                                null
                                        }
                                    </RowWrapperBasic>
                                    <Spacer height={sizes.smallMargin} />
                                    <TinyText style={[appStyles.textGray]}>{HelpingMethods.formateDatePost(item.created_at)}</TinyText>
                                </Wrapper>
                            </RowWrapperBasic>
                        </TouchableOpacity>
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
                    <MediumText onPress={onPressPost}>{item.title}</MediumText>
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
                postImages ?
                    postImages.length ?
                        <Wrapper>
                            <FlatList
                                data={postImages}
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
                    :
                    null
            }

            <Spacer height={sizes.smallMargin} />
            <RowWrapper style={{ marginHorizontal: sizes.marginHorizontalXLarge }}>
                <IconWithText
                    iconName="thumb-up"
                    text={item.reactions.length}
                    tintColor={HelpingMethods.checkIsPostLiked(item.id) ? appStyles.textPrimaryColor.color : appStyles.textLightGray.color}
                    onPress={onPressLike}
                />
                <IconWithText
                    customIcon={appIcons.comment}
                    text={item.comments.length}
                    tintColor={appStyles.textLightGray.color}
                    onPress={onPressPost}
                />
                <IconWithText
                    customIcon={appIcons.share}
                    text={'Share'}
                    tintColor={appStyles.textLightGray.color}
                    onPress={onPressShare}
                />
            </RowWrapper>
            <Spacer height={sizes.smallMargin} />
            <LineHorizontal height={0.5} />
            <Spacer height={sizes.smallMargin} />
            <TextInputColored
                inputRef={commentInputRef}
                onPress={!enableComment && onPressPost}
                placeholder="Write a comment..."
                editable={enableComment ? true : false}
                iconNameRight="send"
                iconTypeRight="feather"
                right={
                    loadingSendComment ?
                        <>
                            {
                                <ComponentWrapper>
                                    <MaterialIndicator
                                        size={totalSize(2)}
                                        color={colors.appColor1}
                                    />
                                </ComponentWrapper>

                            }
                        </>
                        :
                        null
                }
                value={commentText}
                //onChangeText={text => setCommentText(text)}
                onChangeText={text => {
                    setCommentText(text)
                }}
                iconColorRight={commentText ? colors.appColor1 : colors.appTextColor4}
                containerStyle={styles.smallMarginHorizontal}
                onPressIconRight={() => {
                    commentText && enableComment ? onPressSendComment(commentText, commentImage) : null
                }}
                left={
                    <Wrapper>
                        <Menu
                            ref={cameraMenuRef}
                            button={
                                <Wrapper
                                    style={{ marginLeft: sizes.marginHorizontalSmall }}
                                >
                                    <AbsoluteWrapper style={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                        {
                                            commentImage ?
                                                <ImageRound
                                                    source={{ uri: commentImage.uri }}
                                                    size={totalSize(4)}
                                                />
                                                :
                                                null
                                        }
                                    </AbsoluteWrapper>
                                    <IconButton
                                        iconName="camera"
                                        iconType="feather"
                                        iconSize={totalSize(2)}
                                        buttonSize={totalSize(4)}
                                        buttonColor={colors.appColor1 + '20'}
                                        iconColor={commentImage ? colors.appTextColor6 : colors.appColor1}
                                        // buttonStyle={{ marginLeft: sizes.marginHorizontalSmall }}
                                        onPress={() => {
                                            enableComment && cameraMenuRef.current.show()
                                        }}
                                    />
                                </Wrapper>
                            }
                            style={appStyles.menuMainContainer}
                        >
                            <Wrapper style={[appStyles.menuContainer, {}]}>
                                <IconWithText
                                    iconName="camera-outline"
                                    text={'Take Photo'}
                                    tintColor={colors.appColor1}
                                    textStyle={[appStyles.textRegular, appStyles.textPrimaryColor, appStyles.fontBold]}
                                    textContainer={{ marginHorizontal: sizes.marginHorizontalSmall }}
                                    onPress={() => {
                                        cameraMenuRef.current.hide()
                                        setTimeout(() => {
                                            launchCamera()
                                        }, 500);
                                    }}
                                />
                                <Spacer height={sizes.smallMargin} />
                                <IconWithText
                                    iconName="image-multiple-outline"
                                    text={'Choose from gallery'}
                                    tintColor={colors.appColor1}
                                    textStyle={[appStyles.textRegular, appStyles.textPrimaryColor, appStyles.fontBold]}
                                    textContainer={{ marginHorizontal: sizes.marginHorizontalSmall }}
                                    onPress={() => {
                                        cameraMenuRef.current.hide()
                                        setTimeout(() => {
                                            launchImagePicker()
                                        }, 500);
                                    }}
                                />
                            </Wrapper>
                        </Menu>
                    </Wrapper>
                }
                inputStyle={{ paddingHorizontal: sizes.marginHorizontalSmall }}
            />
            <Spacer height={sizes.smallMargin} />
            <RenderComments
                data={postComments}
                onPress={(item, index) => onPressComment(item, index)}
            />
            <Spacer height={sizes.smallMargin} />


        </Wrapper>
    )
})
