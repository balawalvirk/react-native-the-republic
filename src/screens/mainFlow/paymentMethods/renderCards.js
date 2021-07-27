import React from 'react'
import { FlatList } from 'react-native'
import { width } from 'react-native-dimension'
import { CreditCardPrimary, Spacer, Wrapper } from '../../../components'
import { sizes } from '../../../services'

export function RenderPaymentMethods({ data, onPressItem, onPressSelect, selectedIndex }) {
    return (
        <Wrapper>
            <FlatList
                data={data}
                key={'key'}
                horizontal
                ListHeaderComponent={() => <Spacer width={sizes.marginHorizontal} />}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <CreditCardPrimary
                            containerStyle={{ width: width(80), marginLeft: 0, marginRight: sizes.marginHorizontalSmall, marginVertical: sizes.marginVertical }}
                            name={item.name}
                            cardNumber={item.number}
                            expiry={item.expiry}
                            type={item.type}
                            shadow
                            onPress={() => onPressItem(item, index)}
                            onPressSelect={() => onPressSelect(item, index)}
                            isDefault={selectedIndex === index}
                        />
                    )
                }}
            />
        </Wrapper>
    )
}