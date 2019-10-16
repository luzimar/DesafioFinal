import React, { useState, useMemo, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Day, DayText } from './styles';
import Meetup from '~/components/Meetup';
import Background from '~/components/Background';
import {
  getSubscriptionsRequest,
  cancelSubscriptionRequest,
} from '~/store/modules/subscription/actions';

import { useDispatch, useSelector } from 'react-redux';

export default function Subscription() {
  const dispatch = useDispatch();
  const subscriptions = useSelector(state => state.subscription.subscriptions);

  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    dispatch(getSubscriptionsRequest(date));
  }, [[], date]);

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleCancelSubscription(id) {
    dispatch(cancelSubscriptionRequest(id));
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
