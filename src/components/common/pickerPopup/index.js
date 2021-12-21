import React, { useState } from "react"
import { height, totalSize } from "react-native-dimension"
import { Icon } from "react-native-elements"
import { Cards, Modals, PickerPrimary, PopupPrimary, SearchTextinput, Spacer, Spacers, TextInputs, UnderlinedWithArrowCard, Wrapper, Wrappers } from "../.."
import { colors, sizes } from "../../../services"

export default function PickerPopup({
    visible, toggle, data, onPressItem,
    isSelected, enableSearch, textKey, topMargin,
    selectionIndicator, headerTitle, onPressDone, showHeader
}) {
    const isCheck = selectionIndicator === 'check' || !selectionIndicator
    const isRadio = selectionIndicator === 'radio'
    const [searchQuery, setSearchQuery] = useState('')

    const getSearchedData = () => {
        let tempData=[]
        if(data){
            if(searchQuery&&data.length){
                const query=searchQuery.toLowerCase()
                tempData=data.filter(item=>{
                    const title=textKey ? item[textKey] : item
                    return title.toLowerCase().includes(query)
                })
            }
        }
        return tempData
    }
    const filteredData = !searchQuery ? data : getSearchedData()
    return (
        <PopupPrimary
            visible={visible}
            toggle={toggle}
            showHeader
            //onPressClose={toggle}
            headerTitle={headerTitle ? headerTitle : 'Select'}
            onPressButton1={() => {
                onPressDone ? onPressDone() : toggle()
            }}
            buttonText1="Done"
            topMargin={topMargin ? topMargin : height(30)}
            headerBottom={
                <>
                    {
                        enableSearch ?
                            <>
                                {/* <Spacers.Tiny /> */}
                                <SearchTextinput
                                    value={searchQuery}
                                    onChangeText={v => setSearchQuery(v)}
                                    onPressCross={() => setSearchQuery('')}
                                />
                                <Spacer height={sizes.TinyMargin} />
                            </>
                            :
                            null
                    }

                </>

            }
        >
            <Wrapper>

                {data ? data.length ?
                    filteredData.map((item, index) => {
                        const is_selected = isSelected(item, index)
                        return (
                            <UnderlinedWithArrowCard
                                containerStyle={{ borderTopColor: colors.appBgColor3, borderBottomColor: colors.appBgColor3, paddingVertical: sizes.marginVertical / 1.5 }}
                                title={textKey ? item[textKey] : item}
                                left={
                                    isCheck ?
                                        <Icon
                                            name={is_selected ? "checkmark-circle" : "radio-button-off"}
                                            type={"ionicon"}
                                            color={is_selected ? colors.appColor1 : colors.appBgColor3}
                                            size={totalSize(3)}
                                            style={{ marginRight: sizes.marginHorizontal / 2 }}
                                        />
                                        :
                                        null
                                }
                                right={
                                    isRadio ?
                                        <Icon
                                            name={is_selected ? "radio-button-on" : "radio-button-off"}
                                            type={"ionicon"}
                                            color={is_selected ? colors.appColor1 : colors.appBgColor3}
                                            size={totalSize(3)}
                                        />
                                        :
                                        <></>
                                }
                                onPress={() => onPressItem(item, index)}
                            />
                        )
                    })
                    :
                    null : null
                }
            </Wrapper>
        </PopupPrimary>
    )
}