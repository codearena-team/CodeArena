import React, { useState, useRef, useEffect } from "react";
import '../../../css/C_dividingLine.css';

export default function DividingLine({ onDividerMove }) {
    // 상태 관리를 통해 마우스 커서 상태 및 구분선 위치 관리
    const [isHovered, setIsHovered] = useState(false); // 구분선 위에 마우스 올렸을 때 보이기, 숨기기
    const [dividerPosition, setDividerPosition] = useState(60); // 초기 위치를 60% : 40% 비율로 설정
    const [isDragging, setIsDragging] = useState(false); // 드래그 여부
    const [isMouseIn, setIsMouseIn] = useState(false); // 클릭을 유지하고 있는지 여부

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
            requestAnimationFrame(() => {
                // onDividerMove 콜백함수를 props로 호출하여 왼쪽과 오른쪽 패널의 비율을 조정
                onDividerMove(newPosition);
            });

            // 비율 유지를 위해 스타일에 적용
            setDividerPosition(newPosition);

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
        <div className="competition-view">
            <div
                className={`vertical-dividingLine ${isHovered || isDragging ? 'hovered' : ''}`}
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