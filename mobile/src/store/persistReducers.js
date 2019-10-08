import storage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'meetapp',
      storage,
      whiteList: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
