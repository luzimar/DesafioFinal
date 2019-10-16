import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  subscriptions: [],
};

export default function subscription(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subscription/GET_SUBSCRIPTIONS_REQUEST':
      case '@subscription/CREATE_SUBSCRIPTION_REQUEST':
      case '@subscription/CANCEL_SUBSCRIPTION_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@subscription/SUBSCRIPTION_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@subscription/GET_SUBSCRIPTIONS_SUCCESS': {
        draft.loading = false;
        draft.subscriptions = action.payload.data;
        break;
      }
      case '@subscription/SUBSCRIPTION_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
        return state;
    }
  });
}
