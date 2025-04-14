import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes, routes, HelpingMethods } from '../../services';
import { ComponentWrapper, Wrapper } from '../wrappers';
import { MediumText, RegularText, TinyText } from '../text';
import { Spacer } from '../spacers';
import { MaterialIndicator } from 'react-native-indicators';
import { ProductCardPrimary } from '../cards'
import { navigate } from '../../services/navigation/rootNavigation';

export const ChatBubbule = ({ containerStyle, myMessage, message, time, image, loadingSendMessage, product }) => {
    return (
        <ComponentWrapper
            animation={!myMessage ? 'fadeInLeft' : 'fadeInRight'}
            duration={250}
            style={[{
                alignItems: !myMessage ? 'flex-start' : 'flex-end',
                //alignItems: 'flex-start',
                //marginTop: 0
            }, containerStyle]}
        >
            {
                product ?
                    <Wrapper>
                        <ProductCardPrimary
                            containerstyle={{ marginHorizontal: 0 }}
                            isFavourite={HelpingMethods.checkIsProductFavourite(product.id)}
                            viewType={'grid'}
                            image={
                                product.images ?
                                    JSON.parse(product.images)[0] :
                                    appImages.noImageAvailable
                            }
                            description={product.title}
                            price={product.price}
                            discountedPrice={product.discounted_price}
                            location={product.address}
                            rating={product.avg_rating}
                            reviewCount={product.reviews_count}
                            userImage={product.user.profile_photo_path}
                            userName={product.user.first_name}
                            onPress={(item, index) => {
                                // sheetRef.current.snapTo(0);
                                navigate(routes.productDetail, { product: product })
                            }}
                        />
                        <Spacer height={sizes.smallMargin} />
                    </Wrapper>
                    :
                    null
            }
            <Wrapper style={{ backgroundColor: !myMessage ? colors.appBgColor3 : colors.appColor1, borderRadius: sizes.cardRadius }}>
                {
                    image ?
                        <Wrapper>
                            <Image
                                source={{ uri: image }}
                                style={[styles.imageStyle]}
                            />
                        </Wrapper>
                        :

                        null
                }
                {
                    message ?
                        <Wrapper style={{ paddingHorizontal: sizes.marginHorizontal, paddingVertical: sizes.marginVertical / 2, }}>
                            <MediumText style={[!myMessage ? null : appStyles.textWhite]}>{message}</MediumText>
                        </Wrapper>
                        :
                        null
                }

            </Wrapper>
            {
                loadingSendMessage ?
                    <Wrapper flex={1} style={{ marginVertical: 5, }}>
                        <MaterialIndicator
                            size={totalSize(1.25)}
                            color={colors.appTextColor5}
                        />
                    </Wrapper>
                    :
                    <TinyText style={[appStyles.textLightGray, { margin: sizes.TinyMargin }]}>{time}</TinyText>
            }
        </ComponentWrapper>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: height(25),
        width: width(75),
        borderRadius: sizes.cardRadius
    }
})