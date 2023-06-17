import React, {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import useChatRoom from './useChatRoom';

function ChatRoom() {
  const {
    handler: {handleBack, handleSend, setMessage},
    state: {message, processData, roomInfo, flatlistRef},
  } = useChatRoom();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.item}>Back</Text>
        </TouchableOpacity>

        <View>
          <Text>{roomInfo.roomName}</Text>
          <Text style={styles.roomId}>#{roomInfo.id}</Text>
        </View>
        <View style={styles.item} />
      </View>
      <View style={styles.containerChat}>
        <FlatList
          ref={flatlistRef}
          data={processData}
          renderItem={({item: el}) => (
            <View
              style={[
                styles.itemChat,
                el.isMine ? styles.itemChatMine : styles.itemChatOther,
              ]}>
              <Text
                style={[
                  styles.itemChatText,
                  el.isMine
                    ? styles.itemChatTextMine
                    : styles.itemChatTextOther,
                ]}>
                {el.message}
              </Text>
              <Text
                style={[
                  styles.itemChatTextDate,
                  el.isMine
                    ? styles.itemChatTextMine
                    : styles.itemChatTextOther,
                ]}>
                {el.time}
              </Text>
            </View>
          )}
          keyExtractor={(_, index) => `${index}`}
        />
      </View>
      <View style={styles.containerForm}>
        <TextInput
          style={styles.inputText}
          placeholder="Start typing..."
          onChangeText={setMessage}
          value={message}
        />
        <TouchableOpacity onPress={handleSend}>
          <Text style={styles.btnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  item: {width: 70, paddingHorizontal: 12, color: '#0079FF'},
  header: {
    paddingVertical: 12,
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerForm: {
    borderTopColor: '#F8F8F8',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  inputText: {
    height: 50,
    flex: 1,
    paddingLeft: 12,
  },
  roomId: {
    fontSize: 11,
    color: '#213363',
    textAlign: 'center',
    marginTop: 4,
  },
  btnText: {
    color: '#0079FF',
    lineHeight: 50,
    paddingHorizontal: 12,
  },
  containerChat: {
    flex: 1,
    padding: 12,
  },
  itemChat: {
    padding: 6,
    marginBottom: 8,
    borderRadius: 4,
    minWidth: '50%',
    maxWidth: '80%',
  },
  itemChatMine: {
    alignSelf: 'flex-end',
    backgroundColor: '#0079FF',
  },
  itemChatOther: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
  },
  itemChatText: {
    marginBottom: 4,
  },
  itemChatTextDate: {
    textAlign: 'right',
    fontSize: 11,
  },
  itemChatTextMine: {
    color: '#ffffff',
  },
  itemChatTextOther: {
    color: '#393646',
  },
});

export default ChatRoom;
