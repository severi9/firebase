import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { firestore, MESSAGES } from './database/Config';
import { collection, query, onSnapshot, serverTimestamp, addDoc, deleteDoc, doc } from 'firebase/firestore';


export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('')

  const save = async () => {
    if (newMessage.trim() === '') return; 
    try {
      await addDoc(collection(firestore, MESSAGES), {
        text: newMessage,
        created: serverTimestamp()
      });
      setNewMessage('');
      console.log('Message saved');
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await deleteDoc(doc(firestore, MESSAGES, id));
      console.log('Message deleted:', id);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES)); 
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        tempMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(tempMessages); 
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Type a message...'
        value={newMessage}
        onChangeText={text => setNewMessage(text)}
        style={styles.input}
        />
        <Button title='Save' onPress={save} />
        <ScrollView style={styles.messageContainer}>
        {messages.map((message) => (
          <View key={message.id} style={styles.message}>
            <Text>{message.text}</Text>
            <TouchableOpacity onPress={() => deleteMessage(message.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 40,
  },
  input: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  messageContainer: {
    width: '100%',
    marginTop: 10,
  },
  message: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginVertical: 5,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  }
});