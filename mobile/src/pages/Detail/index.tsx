import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, Linking } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import  * as MailComposer from 'expo-mail-composer'

import api from '../../services/api'

import {
    Container,
    BackButton,
    PointImage,
    PointName,
    PointItems,
    AdressContainer,
    AdressTitle,
    AdressText,
    Footer,
    ButtonText
} from './styles'

interface Params {
    id: number;
}

interface Data {
    point: {
        image: string;
        image_url: string;
        name: string;
        email: string;
        whatsapp: string;
        city: string;
        uf: string;
    };
    items: {
        title: string;
    }[]
}

const Detail = () => {
    const navigation = useNavigation()
    const route = useRoute()

    const routeParams = route.params as Params
    console.log(routeParams.id)

    function navigateBack() {
        navigation.goBack()
    }

    const [data, setData] = useState<Data>({} as Data)
    console.log(data)

    useEffect(() => {
        api.get(`points/${routeParams.id}`).then(response => {
            setData(response.data)
        })
    }, [])

    if (!data.point) {
        return null
    }

    function composeEmail() {
        MailComposer.composeAsync({
            subject: "Interesse na coleta de resíduos",
            recipients: [data.point.email]
        })
    }

    function composeWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5593991384250&text=Tenho interesse sobre coleta de resíduos.`)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <BackButton onPress={navigateBack}>
                    <Feather name="arrow-left" size={20} color="#34cb79" />
                </BackButton>

                <PointImage
                    source={{
                        uri: data.point.image_url
                    }}
                    resizeMode="cover"
                />

                <PointName>{data.point.name}</PointName>
                <PointItems>
                    {data.items.map(item => item.title).join(', ')}
                </PointItems>

                <AdressContainer>
                    <AdressTitle>Endereço</AdressTitle>
                    <AdressText>{data.point.city} / {data.point.uf}</AdressText>
                </AdressContainer>
            </Container>

            <Footer>
                <RectButton style={styles.button} onPress={composeWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#FFF" />
                    <ButtonText>Whatsapp</ButtonText>
                </RectButton>

                <RectButton style={styles.button} onPress={composeEmail}>
                    <Feather name="mail" size={20} color="#FFF" />
                    <ButtonText>Email</ButtonText>
                </RectButton>
            </Footer>
        </SafeAreaView>
    )
}

export default Detail

const styles = StyleSheet.create({
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });