import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';
import history from '~/services/history';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload;

    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', profile);

    if (!response.data.success) {
      toast.warn(response.data.message);
      yield put(updateProfileFailure());
      return;
    }

    const { user } = response.data;

    yield put(updateProfileSuccess(user));
    toast.success(response.data.message);
    history.push('/dashboard');
  } catch (err) {
    toast.error('Algo deu errado ao editar perfil, verifique seus dados :(');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
