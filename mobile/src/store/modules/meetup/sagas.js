import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import api from '~/services/api';
import { meetupSuccess, meetupFailure, getMeetupsSuccess } from './actions';

export function* subscribeMeetup({ payload }) {
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
      showMessage({
        message: response.data.message,
        type: 'warning',
      });
      yield put(meetupFailure());
      return;
    }
    yield put(meetupSuccess());

    showMessage({
      message: 'Inscrição realizada com sucesso ;)',
      type: 'success',
    });
    //history.push('/dashboard');
  } catch (err) {
    showMessage({
      message: 'Algo deu errado ao se inscrever no meetup, tente novamente',
      type: 'danger',
    });
    yield put(meetupFailure());
  }
}

export function* cancelSubscribeMeetup({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `meetups/${id}`);

    if (!response.data.success) {
      showMessage({
        message: response.data.message,
        type: 'warning',
      });
      yield put(meetupFailure());
      return;
    }
    yield put(meetupSuccess());
    showMessage({
      message: 'Inscrição cancelada com sucesso ;)',
      type: 'success',
    });

    history.push('/dashboard');
  } catch (error) {
    showMessage({
      message: 'Algo deu errado ao cancelar sua inscrição :C',
      type: 'warning',
    });
    yield put(meetupFailure());
  }
}

export function* getMeetups() {
  try {
    const response = yield call(api.get, 'meetupsByOrganizer');
    if (!response.data.success) {
      showMessage({
        message: response.data.message,
        type: 'warning',
      });
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
    showMessage({
      message:
        'Algo deu errado ao listar meetups, que tal reinciar o aplicativo?',
      type: 'danger',
    });
    yield put(meetupFailure());
  }
}

export default all([
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', subscribeMeetup),
  takeLatest('@meetup/DELETE_MEETUP_REQUEST', cancelSubscribeMeetup),
  takeLatest('@meetup/GET_MEETUPS_REQUEST', getMeetups),
]);
