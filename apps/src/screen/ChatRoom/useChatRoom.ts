/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, useRef, useMemo} from 'react';

import {useNav, useUserAuth} from '../../hooks';
import {isJson} from '../../helper/general';

const connectInitial = 'connect';

function useChatRoom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    {message: string; userId: string; time: string}[]
  >([]);
  const [roomInfo, setRoomInfo] = useState({
    id: 0,
    roomName: '',
    masterRoom: false,
  });
  const websocket = useRef<any>(null);
  const flatlistRef = useRef<any>(null);

  const {navigation, route} = useNav();
  const {userId} = useUserAuth();

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (route.params?.id && route.params.roomName) {
      // room master, will trigger this action
      setRoomInfo({
        id: route.params.id,
        roomName: route.params.roomName,
        masterRoom: true,
      });
    } else if (route.params?.id) {
      // user joined by id, will trigger this action
      setRoomInfo({
        id: route.params.id,
        roomName: '',
        masterRoom: false,
      });
    }
  }, [route.params]);

  useEffect(() => {
    const url = 'ws://localhost:8000/ws/' + roomInfo.id;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      ws.send(connectInitial);
    };

    ws.onmessage = e => {
      // listen message data
      const data = JSON.parse(e.data);
      const dataMessage = isJson(data.message);

      if (data.clientId === roomInfo.id) {
        if (dataMessage) {
          const dataItem = JSON.parse(data.message);

          // message type data
          if (dataItem.type === 'message') {
            // Get new message and push the data
            setMessages([
              ...messages,
              {...JSON.parse(data.message), time: data.time},
            ]);
            // room info data
          } else if (dataItem.type === 'room_info') {
            // Get roomName by room master sent message
            setRoomInfo({
              ...roomInfo,
              roomName: dataItem.roomName,
              id: route.params?.id || 0,
            });
          }
        } else if (
          data.message.startsWith(connectInitial) &&
          roomInfo.masterRoom
        ) {
          // Sending roomName for user joined by roomID
          ws.send(
            JSON.stringify({type: 'room_info', roomName: roomInfo.roomName}),
          );
        }
      }
    };

    // pass socket, it will be user on another func, like "handleSend"
    websocket.current = ws;

    // Disconnect socket
    return () => ws.close();
  }, [messages, roomInfo.id]);

  const handleSend = () => {
    // send message
    websocket.current.send(JSON.stringify({message, userId, type: 'message'}));
    setTimeout(() => {
      // wait until message pushed, and auto scroll to bottom
      flatlistRef?.current?.scrollToEnd();
    }, 100);
    // reset message
    setMessage('');
  };

  const processData = useMemo(() => {
    // process the data
    return messages.map(({userId: id, ...other}) => ({
      ...other,
      isMine: id === userId,
    }));
  }, [messages, userId]);

  return {
    state: {
      message,
      messages,
      processData,
      roomInfo,
      flatlistRef,
    },
    handler: {
      handleBack,
      handleSend,
      setMessage,
    },
  };
}

export default useChatRoom;
