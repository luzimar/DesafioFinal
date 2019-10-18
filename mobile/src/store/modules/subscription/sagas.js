import { takeLatest, call, put, all } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import api from '~/services/api';
import {
  createSubscriptionSuccess,
  cancelSubscriptionSuccess,
  subscriptionFailure,
  getSubscriptionsSuccess,
} from './actions';
import { navigate } from '~/services/navigation';

export function* createSubscription({ payload }) {
  try {
    const { meetupId } = payload;

    const response = yield call(api.post, `subscriptions/${meetupId}`);

    if (!response.data.success) {
      showMessage({
        message: response.data.message,
        type: 'warning',
      });
      yield put(subscriptionFailure());
      return;
    }
    yield put(createSubscriptionSuccess());

    showMessage({
      message: response.data.message,
      type: 'success',
    });
    //navigate('Subscription');
  } catch (err) {
    showMessage({
      message: 'Algo deu errado ao se inscrever no meetup, tente novamente',
      type: 'danger',
    });
    yield put(subscriptionFailure());
  }
}

export function* cancelSubscription({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `subscriptions/${id}`);

    if (!response.data.success) {
      showMessage({
        message: response.data.message,
        type: 'warning',
      });
      yield put(subscriptionFailure());
      return;
    }
    yield put(cancelSubscriptionSuccess(id));
    showMessage({
      message: response.data.message,
      type: 'success',
    });
    //navigate('Dashboard');
  } catch (error) {
    showMessage({
      message: 'Algo deu errado ao cancelar sua inscrição :C',
      type: 'warning',
    });
    yield put(subscriptionFailure());
  }
}

export function* getSubscriptions({ payload }) {
  try {
    const { date } = payload;
    console.tron.log(date);
    const response = yield call(api.get, 'subscriptions', { params: { date } });

    if (!response.data.success) {
      showMessage({
        message: response.data.message,
        type: 'warning',
      });
      yield put(subscriptionFailure());
      return;
    }

    response.data.subscriptions.forEach(subscription => {
      subscription.Meetup.formattedDate = format(
        parseISO(subscription.Meetup.date),
        "dd 'de' MMMM', às ' HH:mm'h'",
        { locale: pt }
      );
    });

    yield put(getSubscriptionsSuccess(response.data.subscriptions));
  } catch (error) {
    showMessage({
      message:
        'Algo deu errado ao listar inscrições, que tal reinciar o aplicativo?',
      type: 'danger',
    });
    yield put(subscriptionFailure());
  }
}

export default all([
  takeLatest('@subscription/CREATE_SUBSCRIPTION_REQUEST', createSubscription),
  takeLatest('@subscription/CANCEL_SUBSCRIPTION_REQUEST', cancelSubscription),
  takeLatest('@subscription/GET_SUBSCRIPTIONS_REQUEST', getSubscriptions),
]);
