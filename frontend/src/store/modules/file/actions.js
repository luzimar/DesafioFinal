export function uploadFileRequest(data) {
  return {
    type: '@file/UPLOAD_FILE_REQUEST',
    payload: { data },
  };
}

export function uploadFileSuccess(id, url) {
  return {
    type: '@file/UPLOAD_FILE_SUCCESS',
    payload: { id, url },
  };
}

export function uploadFileFailure() {
  return {
    type: '@file/UPLOAD_FILE_FAILURE',
  };
}

export function clearUploadFile() {
  return {
    type: '@file/CLEAR_UPLOAD_FILE',
  };
}
