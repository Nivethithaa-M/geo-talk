import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import { auth, fireStore } from '../../firebase';

export default function ChatHistory() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = fireStore.collection('chat').onSnapshot((snapshot) => {
      let newMessages = [];
      snapshot.forEach((doc) => {
        fireStore
          .collection('chat')
          .doc(doc.id)
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .limit(1)
          .onSnapshot((querySnapshot) => {
            const threads = querySnapshot.docs.map((docSnap) => {
              return {
                ...docSnap.data(),
                _id: docSnap.id,
                text: docSnap.data().messages,
                createdAt: docSnap.data().timestamp.toDate(),
                user: {
                  _id: docSnap.data().title,
                  name: docSnap.data().title.split('@')[0],
                },
              };
            });

            newMessages.push(...threads);

            console.log('threads', threads);
            setMessages(newMessages.sort((a, b) => b.createdAt - a.createdAt));
          });
      });
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messageArr = []) => {
    console.log('messageArr', messageArr);
    console.log('message', messageArr[0]);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messageArr)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.currentUser.email,
        name: auth.currentUser.email.split('@')[0],
      }}
    />
  );
}
