import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ViewPropTypes, FlatList } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes, appStyles } from '../../services';
import { CardWrapper, RowWrapper, ComponentWrapper, Wrapper, AbsoluteWrapper } from '../wrappers';
import { Spacer } from '../spacers';
import { TinyTitle, RegularText } from '../text';
import { TextInputColored, TextInputBordered } from '../textInput';
import Modal from 'react-native-modal'
import { CheckBoxPrimary } from '../checkBoxs';
import { ButtonColored, ButtonGradiantColored, ButtonBordered } from '../buttons';
import { SearchIcon, CloseIcon } from '../icons';
import { styles } from './styles';
import { LineHorizontal } from '../lines';
import { Platform } from 'react-native';



export const ModalSwipeablePrimary = ({ visible, toggle, disableSwipe, topMargin, headerTitle, headerRight, headerLeft, hideHeader, children }) => {
    const defaultTopMargin = topMargin ? (Platform.OS === 'ios' ? topMargin : topMargin + height(5)) : height(12)
    return (
        <Modal
            isVisible={visible} // Comment on video User
            style={{ margin: 0 }}
            onSwipeComplete={toggle}
            swipeDirection={disableSwipe ? null : "down"}
            propagateSwipe
            onBackdropPress={toggle}
            backdropOpacity={0}
        >
            <View
                style={{
                    flex: 1,
                    marginTop: defaultTopMargin,
                    backgroundColor: colors.appBgColor1,
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    ...appStyles.shadowExtraDark
                }}>
                {
                    hideHeader ? null :
                        <View style={appStyles.rowCompContainer}>
                            <AbsoluteWrapper style={{ alignItems: 'center', right: 0, left: 0 }}>
                                <TinyTitle style={[appStyles.headerTitleStyle]}>
                                    {/* {data ? data.length + ' People' : 0 + ' People'} */}
                                    {headerTitle ? headerTitle : 'Title'}
                                </TinyTitle>
                            </AbsoluteWrapper>
                            <View>
                                {
                                    headerLeft ? headerLeft :
                                        <BackIcon
                                            onPress={toggle}
                                            color={colors.appTextColor6}
                                        />
                                }
                            </View>

                            <View style={{}}>
                                {headerRight}
                            </View>
                        </View>
                }
                {children}
            </View>
        </Modal >
    )
}


export const AddValueModal = ({ children, placeholder, title, value, onChangeText, isVisible, toggleModal, buttonText, onPressButton, autoFocus }) => {
    return (
        <Modal
            isVisible={isVisible}
            //swipeDirection="down"
            //onSwipeComplete={toggleModal}
            style={{ flex: 1, margin: 0, justifyContent: 'center' }}
            onBackdropPress={toggleModal}
            backdropOpacity={0.5}
        >
            <CardWrapper style={[styles.enterValueModalPrimaryCard]}>
                <TinyTitle >{title ? title : 'Title'}</TinyTitle>
                <Spacer height={sizes.baseMargin} />
                <TextInputBordered
                    placeholder={placeholder}
                    value={value}
                    autoFocus={autoFocus}
                    onChangeText={onChangeText}
                    inputContainerStyle={{ marginHorizontal: 0 }}
                />
                <Spacer height={sizes.baseMargin} />
                <ButtonColored
                    text={buttonText ? buttonText : 'ADD'}
                    onPress={onPressButton}
                    buttonStyle={{ marginHorizontal: 0 }}
                />
                {children}
            </CardWrapper>
        </Modal>
    );
}