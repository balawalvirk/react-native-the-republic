import React from 'react'
import { height } from "react-native-dimension"
import { MenuOption } from ".."
import { ModalSwipeablePrimary } from "../../modals"

function MenuPopup({options, visible, toggle, onPressOption }) {
    return (
        <ModalSwipeablePrimary
            visible={visible}
            toggle={toggle}
            hideHeader
            topMargin={height(70)}
        >
            {
                options.map((item, index) => {
                    return (
                        <MenuOption
                            title={item}
                            onPress={() => onPressOption(item, index)}
                        />
                    )
                })
            }
        </ModalSwipeablePrimary>
    )
}

export default MenuPopup