import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { ButtonColoredSmall, ButtonGradient, CardWrapper, ComponentWrapper, LargeTitle, LineHorizontal, MainWrapper, RegularText, RowWrapper, Spacer, TitleValue, Wrapper } from '../../../components';
import { appStyles, colors, sizes } from '../../../services';

const TitleValueSecondary = ({ title, value }) => {
    return (
        <TitleValue
            title={title}
            value={value}
            containerStyle={{ flexDirection: 'column', marginHorizontal: 0, alignItems: 'flex-start', }}
            titleStyle={[appStyles.textRegular]}
            valueStyle={[appStyles.textMedium, appStyles.fontBold, { marginTop: sizes.smallMargin }]}
        />
    )
}

function OrderInvoice(props) {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    //navigation params
    const { order } = route.params
    const { user } = order

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Invoice for Order #' + order.id,
        });
    }, [navigation]);
    return (
        <MainWrapper style={{ backgroundColor: colors.appBgColor6 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                maximumZoomScale={5}
                zoomScale={1}
            >
                <Spacer height={sizes.doubleBaseMargin} />
                <CardWrapper>
                    <Spacer height={sizes.baseMargin} />
                    <ComponentWrapper style={[appStyles.center]}>
                        <LineHorizontal color={colors.appBgColor6} height={2} style={{ position: 'absolute', right: 0, left: 0 }} />
                        <ButtonColoredSmall
                            text="Invoice"
                            buttonStyle={[{ paddingHorizontal: sizes.marginHorizontalSmall, borderRadius: 100, backgroundColor: colors.appColor1 }]}
                            textStyle={[appStyles.textMedium, appStyles.fontBold, appStyles.textWhite]}
                        />
                    </ComponentWrapper>
                    <Spacer height={sizes.baseMargin} />
                    <RowWrapper>
                        <Wrapper flex={1}>
                            <TitleValueSecondary
                                title="Order #"
                                value={order.id}
                            />
                        </Wrapper>
                        <Wrapper flex={1}>
                            <TitleValueSecondary
                                title="Date"
                                value={'Fri, 4th June, 2021'}
                            />
                        </Wrapper>
                    </RowWrapper>
                    <Spacer height={sizes.baseMargin} />
                    <ComponentWrapper>
                        <LineHorizontal color={colors.appBgColor4} />
                        <Spacer height={sizes.baseMargin} />

                        <TitleValueSecondary
                            title="Item"
                            value={order.description}
                        />
                        <Spacer height={sizes.baseMargin} />
                        <TitleValueSecondary
                            title="Seller"
                            value={user.name + ' (' + user.name.replace(/ /g, "_").toLowerCase() + '@email.com)'}
                        />
                        <Spacer height={sizes.baseMargin} />
                        <LineHorizontal color={colors.appBgColor4} />
                    </ComponentWrapper>
                    <Spacer height={sizes.baseMargin} />
                    <TitleValue
                        title={'Subtotal'}
                        value={'$ 749.99'}
                    />
                    <Spacer height={sizes.baseMargin} />
                    <TitleValue
                        title={'Tax (10%)'}
                        value={'$ 74.99'}
                    />
                    <Spacer height={sizes.baseMargin} />
                    <TitleValue
                        title={'Transaction Charges'}
                        value={'$ 10.00'}
                    />
                    <Spacer height={sizes.baseMargin} />
                    <ComponentWrapper>
                        <LineHorizontal color={colors.appBgColor4} />
                    </ComponentWrapper>
                    <Spacer height={sizes.baseMargin} />
                    <ComponentWrapper style={[appStyles.center]}>
                        <LargeTitle style={[appStyles.textPrimaryColor]}>$ 834.98</LargeTitle>
                    </ComponentWrapper>
                    <Spacer height={sizes.baseMargin} />
                </CardWrapper>
            </ScrollView>
            <Spacer height={sizes.doubleBaseMargin} />
            <ButtonGradient
                text="Save Invoice"
            />
            <Spacer height={sizes.doubleBaseMargin} />
        </MainWrapper>
    );
}

export default OrderInvoice;
