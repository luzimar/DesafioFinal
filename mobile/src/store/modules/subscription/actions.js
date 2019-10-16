export function createSubscriptionRequest(meetupId) {
  return {
    type: '@subscription/CREATE_SUBSCRIPTION_REQUEST',
    payload: { meetupId },
  };
}

export function cancelSubscriptionRequest(id) {
  return {
    type: '@subscription/CANCEL_SUBSCRIPTION_REQUEST',
    payload: { id },
  };
}

export function subscriptionSuccess() {
  return {
    type: '@subscription/SUBSCRIPTION_SUCCESS',
  };
}

export function subscriptionFailure() {
  return {
    type: '@subscription/SUBSCRIPTION_FAILURE',
  };
}
export function getSubscriptionsRequest(date) {
  return {
    type: '@subscription/GET_SUBSCRIPTIONS_REQUEST',
    payload: { date },
  };
}

export function getSubscriptionsSuccess(data) {
  return {
    type: '@subscription/GET_SUBSCRIPTIONS_SUCCESS',
    payload: { data },
  };
}
