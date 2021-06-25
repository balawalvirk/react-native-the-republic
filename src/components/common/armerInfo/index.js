import React from 'react';
import { Text, View } from 'react-native';
import { TitleInfoPrimary } from '../..'
const ArmerInfo = ({
    info,
}) => {
    const { make, modal, calibre, actionType, shootingType, handedness, barrelLength, manufacturerNumber, firearmsClass } = info
    return (
        <>
            <TitleInfoPrimary
                title="Make"
                info={make ? make : 'N/A'}
                grayBg
            />
            <TitleInfoPrimary
                title="Modal"
                info={modal ? modal : 'N/A'}
            />
            <TitleInfoPrimary
                title="Calibre / Gauge"
                info={calibre ? calibre : 'N/A'}
                grayBg
            />
            <TitleInfoPrimary
                title="Action Type"
                info={actionType ? actionType : 'N/A'}
            />
            <TitleInfoPrimary
                title="Calibre / Gauge"
                info={calibre ? calibre : 'N/A'}
                grayBg
            />
            <TitleInfoPrimary
                title="Shooting Type"
                info={shootingType ? shootingType : 'N/A'}
            />
            <TitleInfoPrimary
                title="Handedness"
                info={handedness ? handedness : 'N/A'}
                grayBg
            />
            <TitleInfoPrimary
                title="Action Type"
                info={actionType ? actionType : 'N/A'}
            />
            <TitleInfoPrimary
                title="Barrel Length"
                info={barrelLength ? barrelLength : 'N/A'}
                grayBg
            />
            <TitleInfoPrimary
                title="Manufacturer Number"
                info={manufacturerNumber ? manufacturerNumber : 'N/A'}
            />
            <TitleInfoPrimary
                title="Firearms Class"
                info={firearmsClass ? firearmsClass : 'N/A'}
                grayBg
            />
        </>
    )
}

export default ArmerInfo;
