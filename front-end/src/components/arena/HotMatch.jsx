import React from 'react';
// npm install styled-components 애니메이트 기능 구현 설치 라이브러리
import styled, { keyframes } from 'styled-components';


export default function HotMatch() {
    // Hot Match 애니메이트
    const fadeIn = keyframes`from {opacity: 0; transform: translateX(-50px);} to {opacity: 1;}`;
    const AnimatedHeader = styled.h1`animation: ${fadeIn} 0.5s ease-in-out forwards;`;

    return (
        <div className='flex flex-col mt-5 relative'>
            <br />
            {/* Hot Match 문구 */}
            <AnimatedHeader className='ml-5 font-bold'>Hot Match !</AnimatedHeader>
            {/* Hot Match 배너 */}
            <div className="mt-5 shadow-xl mb-5" style={{ backgroundColor: '#E3E6D9', height: '450px' }}>
                {/* 캐러셀 */}
                <div className='flex justify-center mt-2'>
                    <div className="carousel carousel-center w-full p-4 space-x-4 rounded-box">
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="rounded-box" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="rounded-box" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="rounded-box" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" className="rounded-box" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="rounded-box" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="rounded-box" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="rounded-box" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}