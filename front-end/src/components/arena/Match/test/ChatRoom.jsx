import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatRoom = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
  
    const fetchMessages = () => {
      axios.get(`http://192.168.100.209:80/chat/room/messages/${roomId}`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('채팅 메시지를 불러오는 중 오류 발생:', error);
        });
    };
  
    const sendMessage = () => {
      axios.post(`http://192.168.100.209:80/chat/room/messages/${roomId}`, { message: newMessage })
        .then(response => {
          setNewMessage('');
          fetchMessages();
        })
        .catch(error => {
          console.error('채팅 메시지를 전송하는 중 오류 발생:', error);
        });
    };
  
    useEffect(() => {
      fetchMessages();
    }, [roomId]);
  
    return (
      <div>
        <h2>채팅방 - {roomId}</h2>
        <div>
          <ul>
            {messages.map(message => (
              <li key={message.id}>
                {message.sender}: {message.text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>
    );
  };
  
  export default ChatRoom;