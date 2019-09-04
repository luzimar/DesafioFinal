export function createMeetupRequest(
  file_id,
  title,
  description,
  location,
  date
) {
  return {
    type: '@meetup/CREATE_MEETUP_REQUEST',
    payload: { file_id, title, description, location, date },
  };
}

export function editMeetupRequest(
  id,
  file_id,
  title,
  description,
  location,
  date
) {
  return {
    type: '@meetup/EDIT_MEETUP_REQUEST',
    payload: { id, file_id, title, description, location, date },
  };
}

export function deleteMeetupRequest(id) {
  return {
    type: '@meetup/DELETE_MEETUP_REQUEST',
    payload: { id },
  };
}

export function meetupSuccess() {
  return {
    type: '@meetup/MEETUP_SUCCESS',
  };
}

export function meetupFailure() {
  return {
    type: '@meetup/MEETUP_FAILURE',
  };
}
export function getMeetupsRequest() {
  return {
    type: '@meetup/GET_MEETUPS_REQUEST',
  };
}

export function getMeetupsSuccess(data) {
  return {
    type: '@meetup/GET_MEETUPS_SUCCESS',
    payload: { data },
  };
}
