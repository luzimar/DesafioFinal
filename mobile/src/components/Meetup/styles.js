import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  margin: auto 20px 20px 20px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Banner = styled.Image`
  align-self: stretch;
  height: 200px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

export const Info = styled.View`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 10px;
  margin: auto 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #000;
`;

export const SubInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #666;
  margin-left: 10px;
`;
export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
