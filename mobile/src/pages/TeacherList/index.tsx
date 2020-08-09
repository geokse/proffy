import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import styles from './styles';

function TeacherList() {
    const [isFiltersVisible, setIiFiltersVisible] = useState(false);

    const [favorites, setFavorites] = useState<number[]>([]);

    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }
        });

    }

    function handleToggleFiltersVisible() {
        setIiFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setIiFiltersVisible(false);
        setTeachers(response.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name='filter' size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <Picker
                            style={styles.input}
                            selectedValue={subject}
                            onValueChange={text => setSubject(String(text))}
                            itemStyle={{ color: '#c1bccc' }}
                            prompt="Qual matéria?"
                        >

                            <Picker.Item value='Artes' label='Artes' />
                            <Picker.Item value='Biologia' label='Biologia' />
                            <Picker.Item value='Ciências' label='Ciências' />
                            <Picker.Item value='Educação física' label='Educação física' />
                            <Picker.Item value='Física' label='Física' />
                            <Picker.Item value='Geografia' label='Geografia' />
                            <Picker.Item value='História' label='História' />
                            <Picker.Item value='Matemática' label='Matemática' />
                            <Picker.Item value='Português' label='Português' />
                            <Picker.Item value='Química' label='Química' />
                        </Picker>



                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>

                                <View style={styles.input}>
                                    <Picker
                                        style={styles.select}
                                        selectedValue={week_day}
                                        onValueChange={text => setWeekDay(String(text))}
                                        itemStyle={{ color: '#c1bccc' }}
                                        prompt="Qual dia da semana?"
                                        pl
                                        mode="dropdown"

                                    >
                                        <Picker.Item value='0' label='Domingo' />
                                        <Picker.Item value='1' label='Segunda-feira' />
                                        <Picker.Item value='2' label='Terça-feira' />
                                        <Picker.Item value='3' label='Quarta-feira' />
                                        <Picker.Item value='4' label='Quinta-feira' />
                                        <Picker.Item value='5' label='Sexta-feira' />
                                        <Picker.Item value='6' label='Sabado' />
                                    </Picker>
                                </View>

                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual horário?"
                                    placeholderTextColor='#c1bccc'
                                />
                            </View>

                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>)}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
                })}

            </ScrollView>

        </View>
    );
}


export default TeacherList;
