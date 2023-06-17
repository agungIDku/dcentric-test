import {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_AUTH = '@USER_ID';

function useUserAuth() {
  const [userId, setUserId] = useState('');

  const getData = async () => {
    const value = await AsyncStorage.getItem(KEY_AUTH);
    if (value !== null) {
      // If user already have id, will use id from async storage
      setUserId(value);
    } else {
      // Generate id for user
      const id = uuid.v4() as string;
      setUserId(id);
      await AsyncStorage.setItem(KEY_AUTH, id);
    }
  };

  useEffect(() => {
    // initial render func
    getData();
  }, []);

  return {
    userId,
  };
}

export default useUserAuth;
