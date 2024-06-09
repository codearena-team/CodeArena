import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function CreateModal({ closeModal, onRoomCreated }) {
  const navigate = useNavigate()
  const userId = useSelector(state => state.auth.userId)
  const [roomName, setRoomName] = useState('');
  const [gameMode, setGameMode] = useState(0)
  const [language, setLanguage] = useState('java')

  const createRoom = () => {
    if (roomName === '') {
      alert('방 제목을 입력해 주세요.');
      return;
    } else {
      const data = {
        title :roomName,
        userId : userId,
        gameMode : gameMode,
        language : language,
      }
      axios.post('https://codearena.shop/game/chat/gameroom/private', data)
        .then(response => {
          if (response.data.status === '200'){
            // alert(`${response.data.name} 방 개설에 성공하였습니다.`);
            navigate(`/game-list/group/lobby/${response.data.data}`)
          }
        })
        .catch(error => {
          // alert('채팅방 개설에 실패하였습니다.');
          console.error('방 생성 중 오류 발생:', error);
        });
    }
  };

  return (
    <div>
        {/* TopBanner 페이지에서의 방 생성 모달 */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box flex justify-between items-end">
            <div>
              <div>
                <label className='font-bold'>방제목:</label>
                <input className='input ml-1' type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                <button className='ml-3' onClick={createRoom}>방 만들기</button>
              </div>
              <div className='mt-5'>
                <label className="font-bold ms-1 mt-1 me-2">언어</label>
                <select onChange={e=>setLanguage(e.target.value)} className=" mb-2 select select-sm select-bordered" >
                  <option>java</option>
                  <option>python</option>
                  <option>cpp</option>
                </select><br />
                <label className="font-bold ms-1 mt-1 me-2">게임모드 :</label>
                <select onChange={e=>setGameMode(e.target.value)} className=" mb-2 select select-sm select-bordered" >
                  <option value={0}>스피드전</option>
                  <option value={1}>효율전</option>
                </select>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
              <button className="btn" 
              onClick={() => {
                closeModal()
                createRoom()
              }}>방생성</button>
              </form>
            </div>
          </div>
        </dialog>
    </div>
  );
};