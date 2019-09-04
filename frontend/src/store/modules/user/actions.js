export function editUserRequest(
  name,
  email,
  oldPassword,
  password,
  confirmPassword
) {
  return {
    type: '@user/EDIT_USER_REQUEST',
    payload: { name, email, oldPassword, password, confirmPassword },
  };
}

export function editUserSuccess(user) {
  return {
    type: '@user/EDIT_USER_SUCCESS',
    payload: { user },
  };
}

export function editUserFailure() {
  return {
    type: '@user/EDIT_USER_FAILURE',
  };
}
