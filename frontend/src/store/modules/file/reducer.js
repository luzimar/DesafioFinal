import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  id: '',
  url: '',
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@file/UPLOAD_FILE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@file/UPLOAD_FILE_SUCCESS': {
        draft.loading = false;
        draft.id = action.payload.id;
        draft.url = action.payload.url;
        break;
      }
      case '@meetup/MEETUP_SUCCESS': {
        draft.id = '';
        draft.url = '';
        break;
      }
      case '@file/UPLOAD_FILE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@file/CLEAR_UPLOAD_FILE': {
        draft.url = '';
        draft.id = '';
        break;
      }
      default:
        return state;
    }
  });
}
