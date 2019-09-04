import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { uploadFileSuccess, uploadFileFailure } from './actions';

export function* uploadFile({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'files', data);

    if (!response.data.success) {
      toast.warn(response.data.message);
      yield put(uploadFileFailure());
      return;
    }

    const { id, url } = response.data.file;
    yield put(uploadFileSuccess(id, url));
  } catch (err) {
    toast.error('Falha no upload de arquivo, verifique seus dados');
    yield put(uploadFileFailure());
  }
}

export default all([takeLatest('@file/UPLOAD_FILE_REQUEST', uploadFile)]);
