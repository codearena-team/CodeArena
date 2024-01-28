// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function MatchArena() {
//   const [roomName, setRoomName] = useState('');
//   const [chatrooms, setChatrooms] = useState([]);

//   const findAllRoom = () => {
//     axios.get('http://192.168.100.209:80/chat/room')
//       .then(response => {
//         console.log(response.data)
//         setChatrooms(response.data);
//       })
//       .catch(error => {
//         console.error('채팅 방을 불러오는 중 오류 발생:', error);
//       });
//   };

//   const createRoom = () => {
//     if (roomName === '') {
//       alert('방 제목을 입력해 주십시요.');
//       return;
//     } else {
//       const params = new URLSearchParams();
//       params.append('user1', roomName);
//       params.append('user2', '유저2');

//       axios.post('http://192.168.100.209:80/chat/room', params)
//         .then(response => {
//           alert(`${response.data.name} 방 개설에 성공하였습니다.`);
//           setRoomName('');
//           findAllRoom();
//         })
//         .catch(error => {
//           alert('채팅방 개설에 실패하였습니다.');
//           console.error('채팅방 생성 중 오류 발생:', error);
//         });
//     }
//   };

//   const enterRoom = (roomId) => {
//     const sender = prompt('대화명을 입력해 주세요.');
//     if (sender !== null && sender !== '') {
//       localStorage.setItem('wschat.sender', sender);
//       localStorage.setItem('wschat.roomId', roomId);
//       window.location.href = `http://192.168.100.209:80/chat/room/enter/${roomId}`;
//     }
//   };

//   useEffect(() => {
//     findAllRoom();
//   }, []);

//   return (
//     <div>
//       <div>
//         <label>방 제목:</label>
//         <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
//         <button onClick={createRoom}>방 만들기</button>
//       </div>
//       <div>
//         <h2>채팅방 목록</h2>
//         <ul>
//           {chatrooms.map(room => (
//             <li key={room.id}>
//               {room.name} - <button onClick={() => enterRoom(room.id)}>입장</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
  