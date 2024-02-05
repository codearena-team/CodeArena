import React, { useState, useRef, useEffect } from "react";
import '../../../css/C_playDividingLine.css';
// import left_wall from '../../../images/arena/GroupPlay/left_wall.png';
// import right_wall from '../../../images/arena/GroupPlay/right_wall.png';


export default function G_playDividingLine({ onDivider_Moving }) {
  // 상태 관리를 통해 마우스 커서 상태 및 구분선 위치 관리
  const [isHovered, setIsHovered] = useState(false); // 구분선 위에 마우스 올렸을 때 보이기, 숨기기
  const [dividerPosition, setDividerPosition] = useState(49); // 초기 위치를 5:5 비율로 설정
  const [isDragging, setIsDragging] = useState(false); // 드래그 여부
  const [isMouseIn, setIsMouseIn] = useState(false); // 클릭을 유지하고 있는지 여부
  // const [showLeftpng, setShowLeftpng] = useState(false);  // 왼쪽 끝에 위치하면 나올 제한 사진
  // const [showRightpng, setShowRightpng] = useState(false); // 오른쪽 끝에 위치하면 나올 제한 사진
  // const [leftWallPosition, setLeftWallPosition] = useState(39); // 초기 위치를 좌측 제한값 위치로 설정
  // const [rightWallPosition, setRightWallPosition] = useState(61); // 초기 위치를 우측 제한값 위치로 설정


  // 버튼 클릭을 추적하기 위한 useRef
  const dividerButtonRef = useRef(null);

  // 마우스가 구분선에 진입하면 hover 상태로 변경
  const handleDividerMouseEnter = () => {
    setIsHovered(true);
  };

  // 마우스가 구분선을 벗어나 dragging 상태가 아니면 hover 상태 해제
  const handleDividerMouseLeave = () => {
    if (!isDragging) {
      setIsHovered(false);
    }
  };

  // 마우스 클릭 시, 클릭한 요소가 버튼인지 확인하고 dragging 상태로 변경
  const handleDividerMouseIn = (e) => {
      // 클릭한 요소가 버튼인지 확인
      if (dividerButtonRef.current && dividerButtonRef.current.contains(e.target)) {
        setIsMouseIn(true); // 클릭 유지 상태 on
        setIsDragging(true);

        // 마우스 업 이벤트가 발생하면 클릭 유지 상태를 해제하는 이벤트 추가
        window.addEventListener("mouseup", handleDividerMouseOut);
      }
  };

  // 구분선에서 마우스 뗄 시 드래그 여부 및 버튼 숨김
  const handleDividerMouseOut = () => {
    setIsDragging(false);
    setIsMouseIn(false); // 클릭 유지 상태 off
    window.removeEventListener("mouseup", handleDividerMouseOut);
  };

  // 구분선을 드래그하여 위치 업데이트
  const handleDividerDrag = (e) => {
    if (isDragging) {
      // 드래그 중일 때만 위치 업데이트
      const newPosition = (e.clientX / window.innerWidth) * 100;

      // (중요) onDividerMove 콜백함수를 props로 호출하여 왼쪽과 오른쪽 패널의 비율을 조정
      // requestAnimationFrame을 사용하여 최적화 -> 구분선 이동시킬 때 반응속도 빨라짐
      if (newPosition >= 35 && newPosition <= 65) {
        // 좌측 35, 우측 65 이내에서만 구분선을 움직이도록 조건 추가
        requestAnimationFrame(() => {
          onDivider_Moving(newPosition);
        });
        setDividerPosition(newPosition);
      } else {
        // 좌측 35, 우측 65 넘어가면 한 번에 이동
        requestAnimationFrame(() => {
          const targetPosition = newPosition < 50 ? 35 : 65;
          onDivider_Moving(targetPosition);
          setDividerPosition(targetPosition);
        });
      }

      // // 좌측 끝에서의 "그만 밀어!" 애니메이트 등장
      // if (newPosition <= 35) {
      //   setShowLeftpng(true);
      //   setTimeout(() => {
      //     setShowLeftpng(false);
      //   }, 5000); // 1초만 보이고 사라지기
      // }

      // // 우측 끝에서의 "그만 밀어!" 애니메이트 등장
      // if (newPosition >= 65) {
      //   setShowRightpng(true);
      //   setTimeout(() => {
      //     setShowRightpng(false);
      //   }, 5000); // 1초만 보이고 사라지기
      // }

      // left_wall.png와 right_wall.png의 위치 조정
      // const leftWallPosition = newPosition - 10; // 좌측 제한값 위치로 설정
      // const rightWallPosition = newPosition + 10; // 우측 제한값 위치로 설정
    }
  };

  // 클릭을 유지하고 있는지 여부에 따라 마우스 이벤트 작동시키기
  useEffect(() => {
      if (isMouseIn) {
          window.addEventListener("mousemove", handleDividerDrag);
          window.addEventListener("mouseup", handleDividerMouseIn);
      }

      return () => {
          window.removeEventListener("mousemove", handleDividerDrag);
          window.removeEventListener("mouseup", handleDividerMouseIn);
      };
  }, [isMouseIn]);

  return (
    <div>
      {/* {showLeftpng && (
        <img
          className="left-wall-png show"
          src={left_wall}
          alt="왼쪽으로 그만 밀어!"
          style={{ left: `${leftWallPosition}%` }}
        />
      )}
      {showRightpng && (
        <img
          className="right-wall-png show"
          src={right_wall}
          alt="오른쪽으로 그만 밀어!"
          style={{ left: `${rightWallPosition}%` }}
        />
      )} */}
      
      <div
        className={`vertical-Lobbydivider-playing ${isHovered || isDragging ? 'hovered' : ''}`}
        style={{ left: `${dividerPosition}%` }}
        onMouseEnter={handleDividerMouseEnter}
        onMouseLeave={handleDividerMouseLeave}
        onMouseDown={handleDividerMouseIn}
        onMouseUp={handleDividerMouseOut}
        onMouseMove={handleDividerDrag}
      >
        {isHovered && !isDragging && (
          <div
            className="divider-button"
            ref={dividerButtonRef}
            onMouseDown={handleDividerMouseIn}
            onMouseUp={handleDividerMouseOut}
          >
            <button onClick={() => setIsDragging(true)}>
              &#60; || &#62;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}