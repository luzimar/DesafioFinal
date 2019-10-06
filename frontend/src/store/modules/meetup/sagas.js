import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import api from '~/services/api';
import { meetupSuccess, meetupFailure, getMeetupsSuccess } from './actions';
import history from '~/services/history';

export function* createMeetup({ payload }) {
  try {
    const { file_id, title, description, location, date } = payload;

    const response = yield call(api.post, 'meetups', {
      file_id,
      title,
      description,
      location,
      date,
    });

    if (!response.data.success) {
      toast.warn(response.data.message);
      yield put(meetupFailure());
      return;
    }
    yield put(meetupSuccess());

    toast.success('Evento created successfully');

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha ao criar meetup, verifique os dados');
    yield put(meetupFailure());
  }
}

export function* editMeetup({ payload }) {
  try {
    const { id, file_id, title, description, location, date } = payload;

    const response = yield call(api.put, `meetups/${id}`, {
      file_id,
      title,
      description,
      location,
      date,
    });
    if (!response.data.success) {
      toast.warn(response.data.message);
      yield put(meetupFailure());
      return;
    }
    yield put(meetupSuccess());
    toast.success('Evento updated successfully');
    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha ao editar meetup, verifique os dados');
    yield put(meetupFailure());
  }
}

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `meetups/${id}`);

    if (!response.data.success) {
      toast.warn(response.data.message);
      yield put(meetupFailure());
      return;
    }
    yield put(meetupSuccess());
    toast.success('Evento deleted successfully');
    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha ao deletar meetup, tente novamente mais tarde');
    yield put(meetupFailure());
  }
}

export function* getMeetups() {
  try {
    const response = yield call(api.get, 'meetupsByOrganizer');
    if (!response.data.success) {
      toast.warn(response.data.message);
      yield put(meetupFailure());
      return;
    }

    response.data.meetups.forEach(meetup => {
      meetup.formattedDate = format(
        parseISO(meetup.date),
        "dd 'de' MMMM', às ' HH:mm'h'",
        { locale: pt }
      );
    });

    console.tron.log(response.data.meetups);

    yield put(getMeetupsSuccess(response.data.meetups));
  } catch (error) {
    toast.error('Falha ao listar meetups, tente novamente mais tarde');
    yield put(meetupFailure());
  }
}

export default all([
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@meetup/EDIT_MEETUP_REQUEST', editMeetup),
  takeLatest('@meetup/DELETE_MEETUP_REQUEST', deleteMeetup),
  takeLatest('@meetup/GET_MEETUPS_REQUEST', getMeetups),
]);
