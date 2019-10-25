import React, { useState, useMemo, useCallback } from 'react';
import { format, addDays, subDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Day, DayText } from './styles';
import Meetup from '~/components/Meetup';
import Background from '~/components/Background';
import api from '~/services/api';
import { showMessage } from 'react-native-flash-message';
import { useFocusEffect } from 'react-navigation-hooks';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useFocusEffect(
    useCallback(() => {
      loadMeetups();
      return;
    }, [date])
  );

  async function loadMeetups() {
    try {
      setLoading(true);
      const response = await api.get('meetups', { params: { date } });
      if (!response.data.success) {
        showMessage({
          message: response.data.message,
          type: 'warning',
        });
        return;
      }
      response.data.meetups.forEach(meetup => {
        meetup.formattedDate = format(
          parseISO(meetup.date),
          "dd 'de' MMMM', às ' HH:mm'h'",
          { locale: pt }
        );
      });
      setMeetups(response.data.meetups);
    } catch (error) {
      showMessage({
        message:
          'Algo deu errado ao listar meetups, que tal reinciar o aplicativo?',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  async function handleAddSubscription(id) {
    try {
      setLoading(true);
      const response = await api.post(`subscriptions/${id}`);

      if (!response.data.success) {
        showMessage({
          message: response.data.message,
          type: 'warning',
        });
        return;
      }
      showMessage({
        message: response.data.message,
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: 'Algo deu errado ao se inscrever no meetup, tente novamente',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <Day>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={20} color="#fff" />
          </TouchableOpacity>
          <DayText>{dateFormatted}</DayText>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={20} color="#fff" />
          </TouchableOpacity>
        </Day>
        {loading ? (
          <ActivityIndicator size="large" color="#f94d6a" />
        ) : (
          <FlatList
            data={meetups}
            keyExtrator={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item}
                buttonText="Realizar inscrição"
                handleAction={() => handleAddSubscription(item.id)}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}
Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
