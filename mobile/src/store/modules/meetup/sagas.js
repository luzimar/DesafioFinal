import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import api from '~/services/api';
import { meetupFailure, getMeetupsSuccess } from './actions';

export function* getMeetups({ payload }) {
  try {
    const { date } = payload;

    const response = yield call(api.get, 'meetups', { params: { date } });

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

export default all([takeLatest('@meetup/GET_MEETUPS_REQUEST', getMeetups)]);
