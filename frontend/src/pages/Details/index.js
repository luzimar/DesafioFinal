import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdEdit,
  MdDeleteForever,
  MdPermContactCalendar,
  MdMyLocation,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, EditButton, DeleteButton, Description } from './styles';
import { deleteMeetupRequest } from '~/store/modules/meetup/actions';
import Modal from '~/components/Modal';

export default function Details({ match }) {
  const id = Number(decodeURIComponent(match.params.id));
  const meetups = useSelector(state => state.meetup.meetups);
  const meetup = meetups.find(m => m.id === id);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const showModal = () => {
    setModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
  };

  const handleConfirm = id => {
    setModalShow(false);
    dispatch(deleteMeetupRequest(id));
  };

  return (
    <Container>
      <Modal
        description="Deseja confirmar o cancelamento deste evento?"
        show={modalShow}
        handleClose={hideModal}
        handleConfirm={() => handleConfirm(meetup.id)}
      />
      <header>
        <h1>{meetup.title}</h1>
        <div>
          <Link to={`/edit/${meetup.id}`}>
            <EditButton>
              <MdEdit size={20} color="#fff" />
              Editar
            </EditButton>
          </Link>
          <DeleteButton onClick={showModal}>
            <MdDeleteForever size={20} color="#fff" />
            Cancelar
          </DeleteButton>
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
