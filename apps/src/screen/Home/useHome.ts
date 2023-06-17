import {useState} from 'react';

import {useNav, useUserAuth} from '../../hooks';

function useHome() {
  const [newRoom, setNewRoom] = useState('');
  const [joinRoom, setJoinRoom] = useState('');

  const {navigation} = useNav();
  const {} = useUserAuth();

  const handleCreateRoom = () => {
    // Generate room id randomly
    const id = Math.floor(100000 + Math.random() * 900000);
    navigation.navigate('ChatRoom', {roomName: newRoom, id});
  };
  const handleJoinRoom = () => {
    navigation.navigate('ChatRoom', {id: +joinRoom});
  };

  return {
    handler: {
      handleCreateRoom,
      handleJoinRoom,
      setNewRoom,
      setJoinRoom,
    },
    state: {
      joinRoom,
      newRoom,
    },
  };
}

export default useHome;
