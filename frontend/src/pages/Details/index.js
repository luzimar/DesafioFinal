import React from 'react';
import { useSelector } from 'react-redux';
import {
  MdEdit,
  MdDeleteForever,
  MdPermContactCalendar,
  MdMyLocation,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, EditButton, DeleteButton, Description } from './styles';

export default function Details({ match }) {
  const id = Number(decodeURIComponent(match.params.id));
  const meetups = useSelector(state => state.meetup.meetups);
  const meetup = meetups.find(m => m.id === id);

  return (
    <Container>
      <header>
        <h1>{meetup.title}</h1>
        <div>
          <Link to={`/edit/${meetup.id}`}>
            <EditButton>
              <MdEdit size={20} color="#fff" />
              Editar
            </EditButton>
          </Link>
          <Link to="/dashboard">
            <DeleteButton>
              <MdDeleteForever size={20} color="#fff" />
              Cancelar
            </DeleteButton>
          </Link>
        </div>
      </header>

      <img src={meetup.banner.url} alt={meetup.title} />
      <Description>{meetup.description}</Description>
      <Description>
        Caso queira participar como palestrante do meetup envie um e-mail para{' '}
        {meetup.organizer.email}
      </Description>

      <div>
        <p>
          <MdPermContactCalendar size={16} color="#999" />
          {meetup.formattedDate}
        </p>
        <p>
          <MdMyLocation size={16} color="#999" />
          {meetup.location}
        </p>
      </div>
    </Container>
  );
}
