import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { editUserSuccess, editUserFailure } from './actions';
import history from '~/services/history';

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
      response.data.message.map(m => toast.warn(m));
      yield put(editUserFailure());
      return;
    }

    const { user } = response.data;

    yield put(editUserSuccess(user));
    toast.success(response.data.message);
    history.push('/dashboard');
  } catch (err) {
    toast.error('Algo deu errado na edição do usuário, verifique seus dados');
    yield put(editUserFailure());
  }
}

export default all([takeLatest('@user/EDIT_USER_REQUEST', editUser)]);
