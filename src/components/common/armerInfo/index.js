import React from 'react';
import { Text, View } from 'react-native';
import { TitleInfoPrimary } from '../..'

const ArmerInfo = ({
    info,
}) => {
    const { make, modal, caliber, actionType, shootingType, handedness, barrelLength, manufacturerNumber, firearmsClass } = info

    const handleItemTitle = (title) => {
        let tempTitle = title
        tempTitle = tempTitle.replace(/([A-Z])/g, ' $1').trim()
        tempTitle = tempTitle.charAt(0).toUpperCase() + tempTitle.slice(1)
        return tempTitle
    }
    return (
        <>
            {Object.entries(info).map((t, k) =>
                <TitleInfoPrimary
                    //title={t[0]}
                    title={handleItemTitle(t[0])}
                    info={t[1] ? t[1] : 'N/A'}
                    grayBg={k % 2 === 0}
                />
            )}
        </>
    )
}

export default ArmerInfo;
