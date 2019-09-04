import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCameraAlt } from 'react-icons/md';
import { Container } from './styles';
import { uploadFileRequest } from '~/store/modules/file/actions';

export default function ImageInput({ src }) {
  const dispatch = useDispatch();
  const stateSrc = useSelector(state => state.file.url);
  const url = stateSrc || src;

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    dispatch(uploadFileRequest(data));
  }

  return (
    <Container>
      <label htmlFor="banner">
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={handleChange}
        />
        {url ? (
          <img src={url} alt="" />
        ) : (
          <>
            <MdCameraAlt size={50} color="#666" />
            <strong>Selecionar imagem</strong>
          </>
        )}
      </label>
    </Container>
  );
}
