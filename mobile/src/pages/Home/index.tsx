import React, { useEffect, useState, ChangeEvent } from 'react'
import { Feather } from '@expo/vector-icons'

import axios from 'axios'

import { useNavigation } from '@react-navigation/native'

import {
    Container,
    Main,
    Icon,
    Title,
    Description,
    Footer,
    LocationInput,
    Button,
    ButtonIcon,
    ButtonText
} from './styles'

interface UF {
    sigla: string;
}

interface City {
    nome: string;
}

const Home = () => {
    const navigation = useNavigation()

    function navigateToPoints(selectedUf: string, selectedCity: string) {
        navigation.navigate('Points', { selectedUf, selectedCity })
    }

    const [ufs, setUfs] = useState<UF[]>([])
    const [cities, setCities] = useState<City[]>([])

    const [selectedUf, setSelectedUf] = useState('0')
    const [selectedCity, setSelectedCity] = useState('0')

    useEffect(() => {
        axios.get<UF[]>(
            'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
        ).then(response => {
            setUfs(response.data)
        })
    }, [])

    useEffect(() => {
        if (selectedUf === '0') {
            return
        }

        axios.get<City[]>(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
        ).then(response => {
            setCities(response.data)
        })
    }, [selectedUf])

    function selectUf(uf: string){
        setSelectedUf(uf);
      }
    
    function selectCity(city: string){
        setSelectedCity(city);
    }
    
    return (
        <Container
            source={require('../../assets/home-background.png')}
        >
            <Main>
                <Icon source={require('../../assets/logo.png')} />
                <Title>Seu marketplace de coleta de resíduos.</Title>
                <Description>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Description>
            </Main>

            <Footer>
                <LocationInput
                    placeholder={{
                        label: 'Selecione uma UF',
                        value: '0'
                    }}
                    value={selectedUf}
                    onValueChange={item => selectUf(item)}
                    items={ufs.map(uf => {
                        return ({ label: `${uf.sigla}`, value: uf.sigla })
                    })}
                />
                <LocationInput
                    placeholder={{
                        label: 'Selecione uma cidade',
                        value: '0'
                    }}
                    value={selectedCity}
                    onValueChange={item => selectCity(item)}
                    items={cities ? cities.map(city => {
                        return ({ label: `${city.nome}`, value: city.nome })
                    }): []}
                />

                <Button onPress={() => navigateToPoints(selectedUf, selectedCity)}>
                    <ButtonIcon>
                        <Feather name="arrow-right" color="#FFF" size={24} />
                    </ButtonIcon>
                    <ButtonText>Entrar</ButtonText>
                </Button>
            </Footer>
        </Container>
    )
}

export default Home