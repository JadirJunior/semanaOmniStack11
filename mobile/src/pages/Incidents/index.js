import React, {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View,FlatList, Image, Text, TouchableOpacity, PanResponder } from 'react-native';
import api from '../../services/api';

import LogoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const Navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [cases, setCases] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident) {
        Navigation.navigate('Detail', {incident});
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (cases>0 && incidents.length == cases) {
            return;
        }

        setLoading(true);
        const response = await api.get('incidents', {
            params: {page}
        }); 

        
        setIncidents([... incidents, ... response.data]);
        setCases(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={LogoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{cases} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                style={styles.IncidentList}
                data={incidents}
                keyExtractor = {incident => String(incident.id)}
                //showsVerticalScrollIndicator = {false}
                onEndReached = {loadIncidents}
                onEndReachedThreshold = {0.2}
                renderItem={( { item: incident }) => (
                    <View style={styles.IncidentList}>
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG: </Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO: </Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR: </Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                        style: 'currency', 
                        currency: 'BRL'
                        }).format(incident.value)}   
                        </Text>

                    <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={() => navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"></Feather>
                    </TouchableOpacity>
                </View>
            </View>
                )}
            />
        </View>
    );
}

