import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes } from '../../services';
import { ComponentWrapper, Wrapper } from '../wrappers';
import { MediumText, RegularText, TinyText } from '../text';
import { Spacer } from '../spacers';

export const ChatBubbule = ({ containerStyle, myMessage, message, time, image }) => {
    return (
        <ComponentWrapper
            animation={!myMessage ? 'fadeInLeft' : 'fadeInRight'}
            style={[{
                alignItems: !myMessage ? 'flex-start' : 'flex-end',
                //alignItems: 'flex-start',
                //marginTop: 0
            }, containerStyle]}
        >
            {
                image ?
                    <Wrapper>
                        <Image
                            source={{ uri: image }}
                            style={[styles.imageStyle]}
                        />
                        <Spacer height={sizes.smallMargin} />
                    </Wrapper>
                    :
                    null
            }
            <Wrapper style={{ backgroundColor: !myMessage ? colors.appBgColor3 : colors.appColor1, paddingHorizontal: sizes.marginHorizontal,paddingVertical: sizes.marginVertical/2, borderRadius: sizes.cardRadius }}>
                <MediumText style={[!myMessage ? null : appStyles.textWhite]}>{message}</MediumText>
            </Wrapper>
            <TinyText style={[appStyles.textLightGray, { margin: sizes.TinyMargin }]}>{time}</TinyText>
        </ComponentWrapper>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: height(25),
        width: width(75),
        borderRadius: 25
    }
})