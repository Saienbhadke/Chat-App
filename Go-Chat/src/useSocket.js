import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export function useSocket() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/messages')
      .then(r => r.json())
      .then(data => setMessages(data));

    socket.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off('receive_message');
  }, []);

  const sendMessage = (text, user) => {
    socket.emit('send_message', { text, user });
  };

  return { messages, sendMessage };
}