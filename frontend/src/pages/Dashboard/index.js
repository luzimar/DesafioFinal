import React, { useEffect } from 'react';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMeetupsRequest } from '~/store/modules/meetup/actions';
import { Container, Time } from './styles';
import { clearUploadFile } from '~/store/modules/file/actions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetup.meetups);

  useEffect(() => {
    dispatch(getMeetupsRequest());
    dispatch(clearUploadFile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="/create">
          <button>
            <MdAddCircleOutline size={24} color="#fff" />
            Novo meetup
          </button>
        </Link>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Time key={meetup.id}>
            <strong>{meetup.title}</strong>
            <div>
              <span>{meetup.formattedDate}</span>
              <Link to={`/details/${meetup.id}`}>
                <button>
                  <MdKeyboardArrowRight size={24} color="#fff" />
                </button>
              </Link>
            </div>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
