import styled from 'styled-components/native'
import Constants from 'expo-constants'
import { StyleSheet } from 'react-native'

const barHeight = 20 + Constants.statusBarHeight

export const Container = styled.View`
    flex: 1;
    padding: 32px;
    padding-top: ${barHeight}px;
`

export const BackButton = styled.TouchableOpacity``

export const PointImage = styled.Image`
    width: 100%;
    height: 120px;
    border-radius: 10px;
    margin-top: 32px;
`

export const PointName = styled.Text`
    color: #322153;
    font-size: 29px;
    font-family: Ubuntu_700Bold;
    margin-top: 24px;
`

export const PointItems = styled.Text`
    font-family: Roboto_400Regular;
    font-size: 16px;
    line-height: 24px;
    margin-top: 8px;
    color: #6C6C80;
`

export const AdressContainer = styled.View`
    margin-top: 32px;
`

export const AdressTitle = styled.Text`
    color: #322153;
    font-family: Roboto_500Medium;
    font-size: 16px;
`

export const AdressText = styled.Text`
    font-family: Roboto_400Regular;
    line-height: 24px;
    margin-top: 8px;
    color: #6C6C80;
`

export const Footer = styled.View`
    border-top-width: ${StyleSheet.hairlineWidth}px;
    border-color: #999;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 32px;
    padding-right: 32px;
    flex-direction: row;
    justify-content: space-between;
`

export const ButtonText = styled.Text`
    margin-left: 8px;
    color: #FFF;
    font-size: 16px;
    font-family: Roboto_500Medium;
`