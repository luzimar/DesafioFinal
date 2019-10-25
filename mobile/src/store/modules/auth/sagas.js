import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import api from '~/services/api';
import { signInSuccess, signFailure, signUpSuccess } from './actions';
import { navigate } from '~/services/navigation';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    if (!response.data.success) {
      showMessage({
        message: response.data.message,
        type: 'warning',
      });
      yield put(signFailure());
      return;
    }

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (err) {
    showMessage({
      message: 'Algo deu errado na autenticação, verifique seus dados',
      type: 'danger',
    });

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    const response = yield call(api.post, 'users', { name, email, password });
    if (!response.data.success) {
      showMessage({
        message: response.data.message,
        type: 'warning',
      });
      yield put(signFailure());
      return;
    }
    yield put(signUpSuccess());
    showMessage({
      message: response.data.message,
      type: 'success',
    });

    navigate('SignIn');
  } catch (error) {
    showMessage({
      message: 'Algo deu errado no cadastro, verifique seus dados',
      type: 'danger',
    });
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
