export function meetupFailure() {
  return {
    type: '@meetup/MEETUP_FAILURE',
  };
}

export function getMeetupsRequest(date) {
  return {
    type: '@meetup/GET_MEETUPS_REQUEST',
    payload: { date },
  };
}

export function getMeetupsSuccess(data) {
  return {
    type: '@meetup/GET_MEETUPS_SUCCESS',
    payload: { data },
  };
}
