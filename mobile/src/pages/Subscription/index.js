import React, { useState, useMemo, useCallback } from 'react';
import { format, addDays, subDays, parseISO, set } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Day, DayText } from './styles';
import Meetup from '~/components/Meetup';
import Background from '~/components/Background';

import { showMessage } from 'react-native-flash-message';
import api from '~/services/api';
import { useFocusEffect } from 'react-navigation-hooks';

export default function Subscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadSubscriptions() {
    try {
      setLoading(true);
      const response = await api.get('subscriptions', { params: { date } });

      if (!response.data.success) {
        showMessage({
          message: response.data.message,
          type: 'warning',
        });
      }

      response.data.subscriptions.forEach(subscription => {
        subscription.Meetup.formattedDate = format(
          parseISO(subscription.Meetup.date),
          "dd 'de' MMMM', às ' HH:mm'h'",
          { locale: pt }
        );
      });
      setLoading(false);
      setSubscriptions(response.data.subscriptions);
    } catch (error) {
      showMessage({
        message:
          'Algo deu errado ao listar inscrições, que tal reinciar o aplicativo?',
        type: 'danger',
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadSubscriptions();
      return;
    }, [date])
  );

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  async function handleCancelSubscription(id) {
    try {
      const response = await api.delete(`subscriptions/${id}`);

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
      const activeSubscriptions = subscriptions.filter(
        subscription => subscription.id != id
      );
      setSubscriptions(activeSubscriptions);
    } catch (error) {
      showMessage({
        message: 'Algo deu errado ao cancelar sua inscrição :C',
        type: 'warning',
      });
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
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={subscriptions}
            keyExtrator={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item.Meetup}
                buttonText="Cancelar inscrição"
                handleAction={() => handleCancelSubscription(item.id)}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}
Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
