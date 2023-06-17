import React from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';

import useHome from './useHome';
import {TextField, Button} from '../../component';

function Home() {
  const {
    handler: {handleCreateRoom, handleJoinRoom, setNewRoom, setJoinRoom},
    state: {joinRoom, newRoom},
  } = useHome();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text>Create Room</Text>
          <View style={styles.inputItem}>
            <TextField value={newRoom} onChangeText={setNewRoom} />
            <Button label="Create" onPress={handleCreateRoom} />
          </View>
        </View>
        <View>
          <Text>or Join Room</Text>
          <View style={styles.inputItem}>
            <TextField value={joinRoom} onChangeText={setJoinRoom} />
            <Button label="Join" type="success" onPress={handleJoinRoom} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 78,
    display: 'flex',
  },
  inputItem: {
    flexDirection: 'row',
  },
});

export default Home;
