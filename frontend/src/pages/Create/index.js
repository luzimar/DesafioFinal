import React, { useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input, Textarea } from '@rocketseat/unform';
import DatePicker, { registerLocale } from 'react-datepicker';
import { pt } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { Container } from './styles';
import { schemaCreate } from '~/schemaValidators/meetup';
import { createMeetupRequest } from '~/store/modules/meetup/actions';
import ImageInput from '~/components/ImageInput';

import Loading from '~/styles/loading';

export default function Create() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.meetup.loading);
  const file_id = useSelector(state => state.file.id);
  const [startDate, setStartDate] = useState('');
  registerLocale('pt', pt);

  function handleSubmit({ title, description, location, date }) {
    dispatch(createMeetupRequest(file_id, title, description, location, date));
  }

  return (
    <Container>
      <Form schema={schemaCreate} onSubmit={handleSubmit}>
        <ImageInput src="" />
        <Input name="file_id" value={file_id} hidden />
        <Input name="title" placeholder="Título do Meetup" />
        <Textarea
          name="description"
          placeholder="Descrição completa"
          rows={6}
        />

        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          locale="pt"
          showTimeSelect
          timeFormat="p"
          timeIntervals={15}
          dateFormat="dd 'de' MMMM', às ' HH:mm'h'"
          minDate={new Date()}
          placeholderText="Data do meetup"
        />

        <Input name="date" value={startDate} hidden />
        <Input name="location" placeholder="Localização" />

        <div className="btn-save-meetup">
          <button type="submit">
            {loading ? (
              <Loading>
                <BounceLoader sizeUnit="px" size={24} color="#fff" />
              </Loading>
            ) : (
              <>
                <MdAddCircleOutline size={24} color="#fff" />
                Salvar meetup
              </>
            )}
          </button>
        </div>
      </Form>
    </Container>
  );
}
