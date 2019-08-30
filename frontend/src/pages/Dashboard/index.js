import React from 'react';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { Container, Time } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <button>
          <MdAddCircleOutline size={24} color="#fff" />
          Novo meetup
        </button>
      </header>

      <ul>
        <Time>
          <strong>Meetup teste</strong>
          <div>
            <span>24 de junho, ás 20h</span>
            <button>
              <MdKeyboardArrowRight size={24} color="#fff" />
            </button>
          </div>
        </Time>
        <Time>
          <strong>Meetup teste</strong>
          <div>
            <span>24 de junho, ás 20h</span>
            <button>
              <MdKeyboardArrowRight size={24} color="#fff" />
            </button>
          </div>
        </Time>
        <Time>
          <strong>Meetup teste</strong>
          <div>
            <span>24 de junho, ás 20h</span>
            <button>
              <MdKeyboardArrowRight size={24} color="#fff" />
            </button>
          </div>
        </Time>
      </ul>
    </Container>
  );
}
