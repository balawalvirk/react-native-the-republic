import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { totalSize } from 'react-native-dimension'
import { useDispatch, useSelector } from 'react-redux'
import { ComponentWrapper, IconWithText, LineHorizontal, MainWrapper, SearchTextinput, SkeletonPrimaryList, Spacer, TinyTitle, Wrapper } from '../../../components'
import { appStyles, Backend, colors, HelpingMethods, sizes } from '../../../services'
import { setUserDetail } from '../../../services/store/actions'

export default function Services({ navigation, route }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [services, setServices] = useState(null)
    const [loadingAddRemove, setLoadingAddRemove] = useState(-1)

    //redux state
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user)
    const { userDetail } = userData

    useEffect(() => {
        getSetServices()
    }, [])

    const getSetServices = () => {
        // let tempData = []
        // for (let i = 0; i < 20; i++) {
        //     const tempObj = {
        //         name: 'Service Number ' + i,
        //         is_selected: i === 2 || i === 3 ? true : false
        //     }
        //     tempData.push(tempObj)
        // }
        // setServices(tempData)
        Backend.getAllServices().
            then(res => {
                if (res) {
                    setServices(res.data)
                }
            })
    }


    const handlePressServices = async (item, index) => {
        //setLoadingAddRemove(index)
        //HelpingMethods.handleAnimation()
        
        await Backend.handleAddRemoveService(item.id)
        //setLoadingAddRemove(-1)
        // let tempData = services.slice()
        // let tempIndex = services.indexOf(item)
        // tempData[tempIndex].is_selected = !tempData[tempIndex].is_selected
        // HelpingMethods.handleAnimation()
        // setServices(tempData)
    }

    const getSearchedServices = () => {
        let tempData = []
        const query = searchQuery.toLowerCase()
        tempData = getSortedServices().filter(item => item.name.toLowerCase().includes(query))
        return tempData
    }
    const getSortedServices = () => {
        let tempData = []
        tempData = services.sort(function (a, b) {
            //return !a.is_selected;
            return !HelpingMethods.checkIfServiceAdded(a.id);
        })
        return tempData
    }
    let mainServices = []
    if (services === null) {

        return (
            <SkeletonPrimaryList
                NumOfItems={10}
            />
        )
    } else {
        mainServices = !searchQuery ? getSortedServices() : getSearchedServices()
    }
    return (
        <MainWrapper >
            <Spacer height={sizes.baseMargin} />
            <SearchTextinput
                placeholder={'Search Services You Offer'}
                value={searchQuery}
                onChangeText={t => setSearchQuery(t)}
                onPressCross={() => setSearchQuery('')}
            />
            <Spacer height={sizes.smallMargin} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <RenderServices
                    title={'Selected'}
                    // data={services}
                    data={mainServices}
                    onPressItem={handlePressServices}
                    loadingIndex={loadingAddRemove}
                />
            </ScrollView>
        </MainWrapper>
    )
}

const RenderServices = ({ data, onPressItem, loadingIndex }) => {
    return (
        <Wrapper>

            {
                data.map((item, index) => {
                    //const isSelected = item.is_selected
                    const isSelected = HelpingMethods.checkIfServiceAdded(item.id)
                    console.log('isSelected --> ', isSelected)

                    //const isSelectedOption=false
                    let showLabel = true
                    // if (index === 0 && item.is_selected) {
                    //     showLabel = true
                    // }
                    if (index > 0) {
                        //if (data[index].is_selected === data[index - 1].is_selected) {
                        if (HelpingMethods.checkIfServiceAdded(data[index].id) === HelpingMethods.checkIfServiceAdded(data[index - 1].id)) {
                            showLabel = false
                        }
                    }
                    return (
                        <Wrapper>
                            {
                                showLabel ?
                                    <>
                                        <ComponentWrapper style={{ marginTop: sizes.baseMargin, marginBottom: sizes.smallMargin }}>
                                            <TinyTitle>{isSelected ? 'Selected' : 'More Services'}</TinyTitle>
                                        </ComponentWrapper>
                                        <LineHorizontal />
                                    </>
                                    :
                                    null
                            }
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => onPressItem(item, index)}
                                style={[{ paddingVertical: sizes.baseMargin, borderBottomWidth: 1, borderBottomColor: colors.appBgColor4 }]}>
                                <ComponentWrapper>
                                    <IconWithText
                                        iconName={isSelected ? 'checkmark-circle' : 'radio-button-off'}
                                        iconType={'ionicon'}
                                        text={item.name}
                                        tintColor={isSelected ? colors.success : colors.appBgColor4}
                                        iconSize={totalSize(2.5)}
                                        textStyle={[appStyles.textMedium]}
                                        disabled
                                    />
                                </ComponentWrapper>
                            </TouchableOpacity>
                        </Wrapper>

                    )
                })
            }
        </Wrapper>
    )
}