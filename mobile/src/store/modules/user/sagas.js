import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import api from '~/services/api';
import { editUserSuccess, editUserFailure } from './actions';

export function* editUser({ payload }) {
  try {
    const { name, email, oldPassword, password, confirmPassword } = payload;

    const response = yield call(api.put, 'users', {
      name,
      email,
      oldPassword,
      password,
      confirmPassword,
    });

    if (!response.data.success) {
      showMessage({
        message: response.data.message,
        type: 'warning',
      });
      yield put(editUserFailure());
      return;
    }

    const { user } = response.data;

    yield put(editUserSuccess(user));

    //history.push('/dashboard');
  } catch (err) {
    showMessage({
      message: 'Algo deu errao na atualização de perfil, verifique seus dados',
      type: 'danger',
    });
    yield put(editUserFailure());
  }
}

export default all([takeLatest('@user/EDIT_USER_REQUEST', editUser)]);
