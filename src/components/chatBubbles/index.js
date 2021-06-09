import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes } from '../../services';
import { ComponentWrapper, Wrapper } from '../wrappers';
import { RegularText, TinyText } from '../text';
import { Spacer } from '../spacers';

export const ChatBubbule = ({containerStyle, myMessage, message, time, image}) => {
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
                            source={{uri:image}}
                            style={[styles.imageStyle]}
                        />
                        <Spacer height={sizes.smallMargin}/>
                    </Wrapper>
                    :
                    null
            }
            <Wrapper style={{ backgroundColor: !myMessage ? colors.appColor2 : colors.appColor1, padding: sizes.smallMargin, borderRadius: 25 }}>
                <RegularText style={[!myMessage ? appStyles.textPrimaryColor : appStyles.textWhite]}>{message}</RegularText>
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