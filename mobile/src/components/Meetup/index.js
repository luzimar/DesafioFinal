import React from 'react';

import {
  Container,
  Banner,
  Info,
  SubInfo,
  Title,
  SubmitButton,
  Description,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Meetup({ data, buttonText, handleAction }) {
  return (
    <Container>
      <Banner source={{ uri: data.banner.url }} />
      <Info>
        <Title>{data.title}</Title>
        <SubInfo>
          <Icon name="event" size={14} color="#666" />
          <Description>{data.formattedDate}</Description>
        </SubInfo>
        <SubInfo>
          <Icon name="place" size={14} color="#666" />
          <Description>{data.location}</Description>
        </SubInfo>
        <SubInfo>
          <Icon name="person" size={14} color="#666" />
          <Description>Organizador: {data.organizer.name}</Description>
        </SubInfo>
        <SubmitButton onPress={handleAction}>{buttonText}</SubmitButton>
      </Info>
    </Container>
  );
}
