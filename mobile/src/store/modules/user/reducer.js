import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/EDIT_USER_SUCCESS': {
        draft.profile = action.payload.user;
        draft.loading = false;
        break;
      }
      case '@user/EDIT_USER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/EDIT_USER_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
        return state;
    }
  });
}
