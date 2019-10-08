export function createMeetupRequest(
  file_id,
  title,
  description,
  location,
  date
) {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_REQUEST',
    payload: { file_id, title, description, location, date },
  };
}

export function deleteMeetupRequest(id) {
  return {
    type: '@meetup/CANCEL_SUBSCRIBE_MEETUP_REQUEST',
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
