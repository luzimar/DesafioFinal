import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  meetups: [],
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/GET_MEETUPS_REQUEST':
      case '@meetup/CREATE_MEETUP_REQUEST':
      case '@meetup/UPDATE_MEETUP_REQUEST':
      case '@meetup/DELETE_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meetup/MEETUP_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@meetup/GET_MEETUPS_SUCCESS': {
        draft.loading = false;
        draft.meetups = action.payload.data;
        break;
      }
      case '@meetup/MEETUP_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
        return state;
    }
  });
}
