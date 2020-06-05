import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert } from 'react-native'

import { Feather } from '@expo/vector-icons'

import MapView, { Marker } from 'react-native-maps'

import { useNavigation, useRoute } from '@react-navigation/native'

import { SvgUri } from 'react-native-svg'

import api from '../../services/api'

import {
    Container,
    BackButton,
    Title,
    Description,
    MapContainer,
    MarkerPicture,
    MarkerContainer,
    MarkerTitle,
    ItemsContainer,
    ScrollContainer,
    ItemButton,
    ItemTitle
} from './styles'

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface Point {
    id: number;
    name: string;
    image: string;
    image_url: string;
    latitude: number;
    longitude: number;
}

interface Params {
    selectedUf: string;
    selectedCity: string;
}

const Points = () => {
    const navigation = useNavigation()
    const route = useRoute()

    function navigateBack() {
        navigation.goBack()
    }

    function navigateToDetail(id: number) {
        navigation.navigate('Detail', { id })
    }

    const [items, setItems] = useState<Item[]>([])
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    const [points, setPoints] = useState<Point[]>([])

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
        })
    }, [])

    const routeParams = route.params as Params

    const city = routeParams.selectedCity
    const uf = routeParams.selectedUf

    useEffect(() => {
        api.get('points', {
            params: {
                city: city,
                uf: uf,
                items: selectedItems
            }
        }).then(response => {
            setPoints(response.data)
        })
    }, [selectedItems])

    function selectedItem(id: number) {
        const alreadySelected = selectedItems.findIndex(itemId => itemId === id)

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(itemId => itemId !== id)

            setSelectedItems(filteredItems)
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    return (
        <>
            <Container>
                <BackButton onPress={navigateBack}>
                    <Feather name="arrow-left" size={20} color="#34cb79" />
                </BackButton>

                <Title>Bem vindo.</Title>
                <Description>Encontre no mapa um ponto de coleta.</Description>

                <MapContainer>
                    <MapView
                        style={{width: '100%', height: '100%',}}
                        initialRegion={{
                            latitude: -2.445768,
                            longitude: -54.717543,
                            latitudeDelta: 0.050,
                            longitudeDelta: 0.050,
                        }}
                    >
                        {points.map(point => (
                            <Marker
                                key={String(point.id)}
                                style={{
                                    width: 90,
                                    height: 80,
                                }}
                                coordinate={{
                                    latitude: point.latitude,
                                    longitude: point.longitude,
                                }}
                                onPress={() => navigateToDetail(point.id)}
                            >
                                <MarkerContainer>
                                    <MarkerPicture
                                        resizeMode="cover"
                                        source={{
                                            uri: point.image_url
                                        }}
                                    />
                                    <MarkerTitle>{point.name}</MarkerTitle>
                                </MarkerContainer>
                            </Marker>
                        ))}
                    </MapView>
                </MapContainer>
            </Container>

            <ItemsContainer>
                <ScrollContainer
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    {items.map(item => (
                        <ItemButton
                            key={String(item.id)}
                            onPress={() => selectedItem(item.id)}
                            style={
                                selectedItems.includes(item.id) ? styles.selectedItem : {}
                            }
                            activeOpacity={0.7}
                        >
                            <SvgUri width={42} height={42} uri={String(item.image_url)} />
                            <ItemTitle>{item.title}</ItemTitle>
                        </ItemButton>
                    ))}
                </ScrollContainer>
            </ItemsContainer>
        </>
    )
}

export default Points

const styles = StyleSheet.create({
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  });