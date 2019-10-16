import React from 'react';
import { View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';
import { useDispatch } from 'react-redux';
import { SubmitButton } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <View>
      <SubmitButton onPress={handleSignOut}>Sair</SubmitButton>
    </View>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
