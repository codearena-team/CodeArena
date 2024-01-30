import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatRoom from '../match/ChatRoom';

export default function MatchArena() {
  const [roomName, setRoomName] = useState('');
  const [chatrooms, setChatrooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const findAllRoom = () => {
    axios.get('http://192.168.100.209:80/chat/rooms')
      .then(response => {
        console.log('채팅방목록',response.data)
        setChatrooms(response.data);
      })
      .catch(error => {
        console.error('채팅 방을 불러오는 중 오류 발생:', error);
      });
  };

  const createRoom = () => {
    if (roomName === '') {
      alert('방 제목을 입력해 주십시요.');
      return;
    } else {
        const params = new URLSearchParams();
        params.append('user1', '유저1');
        params.append('user2', '유저2');

      axios.post('http://192.168.100.209:80/chat/room', params)
        .then(response => {
          alert(`${response.data.name} 방 개설에 성공하였습니다.`);
          setRoomName('');
          findAllRoom();
        })
        .catch(error => {
          alert('채팅방 개설에 실패하였습니다.');
          console.error('채팅방 생성 중 오류 발생:', error);
        });
    }
  };

  const enterRoom = (roomId) => {
    const sender = prompt('대화명을 입력해 주세요.');
    if (sender !== null && sender !== '') {
      console.log(sender)
      console.log(roomId)
      localStorage.setItem('wschat.sender', sender);
      localStorage.setItem('wschat.roomId', roomId);
      setSelectedRoomId(roomId);
    }
  };

  useEffect(() => {
    findAllRoom();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen shadow-xl rounded-lg">
      {selectedRoomId ? (
        <ChatRoom key={selectedRoomId} roomId={selectedRoomId} />
      ) : (
        <div>
          <div>
            <label>방 제목:</label>
            <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
            <button onClick={createRoom}>방 만들기</button>
          </div>
          <div>
            <h2>채팅방 목록</h2>
            <ul>
              {chatrooms.map(room => (
                <li key={room.id}>
                  {room.name} - <button onClick={() => enterRoom(room.id)}>입장</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
