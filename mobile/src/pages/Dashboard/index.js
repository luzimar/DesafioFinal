import React, { useState, useMemo, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Day, DayText } from './styles';
import Meetup from '~/components/Meetup';
import Background from '~/components/Background';
import { getMeetupsRequest } from '~/store/modules/meetup/actions';
import { createSubscriptionRequest } from '~/store/modules/subscription/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetup.meetups);
  const [date, setDate] = useState(new Date());
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    dispatch(getMeetupsRequest(date));
  }, [[], date]);

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleAddSubscription(id) {
    console.tron.log(id);
    dispatch(createSubscriptionRequest(id));
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
