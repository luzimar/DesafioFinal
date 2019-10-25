import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import {
  Container,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  ExitButton,
  SubmitButtonText,
  ExitButtonText,
} from './styles';
import Background from '~/components/Background';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loadingProfile = useSelector(state => state.user.loading);
  const loadingAuth = useSelector(state => state.auth.loading);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSignOut() {
    dispatch(signOut());
  }
  function handleUpdateProfile() {
    dispatch(
      updateProfileRequest(name, email, oldPassword, password, confirmPassword)
    );
  }
  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            icon="person"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Seu nome"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            keyboardType="email-address"
            icon="mail-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Seu e-mail"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <Separator />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Nova senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação de senha"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleUpdateProfile}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton onPress={handleUpdateProfile} loading={loadingProfile}>
            <SubmitButtonText>Salvar perfil</SubmitButtonText>
          </SubmitButton>
          <ExitButton onPress={handleSignOut} loading={loadingAuth}>
            <ExitButtonText>Sair do Meetapp</ExitButtonText>
          </ExitButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
