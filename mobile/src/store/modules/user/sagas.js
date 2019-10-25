import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
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
      yield put(updateProfileFailure());
      return;
    }

    const { user } = response.data;

    yield put(updateProfileSuccess(user));
    showMessage({
      message: response.data.message,
      type: 'success',
    });
  } catch (err) {
    showMessage({
      message: 'Algo deu errado ao editar perfil, verifique seus dados :(',
      type: 'danger',
    });
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
