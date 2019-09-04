import React, { useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import DatePicker, { registerLocale } from 'react-datepicker';
import { pt } from 'date-fns/locale';
import { parseISO } from 'date-fns';
import { Container } from './styles';
import { editMeetupRequest } from '~/store/modules/meetup/actions';
import EditMeetupSchemaValidator from '~/schemaValidators/EditMeetupSchemaValidator';
import ImageInput from '~/components/ImageInput';
import Loading from '~/styles/loading';

export default function Edit({ match }) {
  const id = Number(decodeURIComponent(match.params.id));
  const meetups = useSelector(state => state.meetup.meetups);
  const meetup = meetups.find(m => m.id === id);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.meetup.loading);
  const file_id = useSelector(state => state.file.id);
  registerLocale('pt', pt);

  const [title, setTitle] = useState(meetup.title);

  const dta = parseISO(meetup.date);
  const [startDate, setStartDate] = useState(dta);

  function handleSubmit({ title, description, location, date }) {
    const file = file_id || meetup.banner.id;
    dispatch(editMeetupRequest(id, file, title, description, location, date));
  }
  // const id = decodeURIComponent(match.params.id);
  // const title = `Meetup de React Native ${id}`;
  return (
    <Container>
      <Form schema={EditMeetupSchemaValidator} onSubmit={handleSubmit}>
        <ImageInput src={meetup.banner.url} />
        <Input name="file_id" value={meetup.banner.id} hidden />
        <Input
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título do Meetup"
        />
        <Textarea
          name="description"
          value={meetup.description}
          placeholder="Descrição completa"
          rows={6}
        />

        <DatePicker
          selected={startDate}
          onChange={d => setStartDate(d)}
          locale="pt"
          dateFormat="dd 'de' MMMM', às ' HH:mm'h'"
          showTimeSelect
          timeIntervals={15}
          minDate={new Date()}
          placeholderText="Data do meetup"
        />
        <Input name="date" value={startDate} hidden />
        <Input
          name="location"
          value={meetup.location}
          placeholder="Localização"
        />
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
