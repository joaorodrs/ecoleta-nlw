import styled from 'styled-components/native'
import Constants from 'expo-constants'

const barHeight = 20 + Constants.statusBarHeight

export const Container = styled.View`
    flex: 1;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: ${barHeight}px;
`

export const BackButton = styled.TouchableOpacity``

export const Title = styled.Text`
    font-size: 20px;
    font-family: Ubuntu_700Bold;
    margin-top: 24px;
`

export const Description = styled.Text`
    color: #6C6C80;
    font-size: 16px;
    margin-top: 4px;
    font-family: Roboto_400Regular;
`

export const MapContainer = styled.View`
    flex: 1;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 16px;
`

export const MarkerPicture = styled.Image`
    width: 90px;
    height: 45px;
`

export const MarkerContainer = styled.View`
    width: 90px;
    height: 70px;
    background-color: #34CB79;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    align-items: center;
`

export const MarkerTitle = styled.Text`
    flex: 1;
    font-family: Roboto_400Regular;
    color: #FFF;
    font-size: 13px;
    line-height: 23px;
`

export const ItemsContainer = styled.View`
    flex-direction: row;
    margin-top: 16px;
    margin-bottom: 32px;
`

export const ScrollContainer = styled.ScrollView``

export const ItemButton = styled.TouchableOpacity`
    background-color: #FFF;
    border-width: 2px;
    border-color: #eee;
    height: 120px;
    width: 120px;
    border-radius: 8px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 20px;
    padding-bottom: 16px;
    margin-right: 8px;
    align-items: center;
    justify-content: space-between;

    text-align: center;
`

export const ItemTitle = styled.Text`
    font-family: Roboto_400Regular;
    text-align: center;
    font-size: 13px;
`
