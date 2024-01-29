import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function StatsisticsPage() {
  // 전적 데이터 생성 (가상)
  const data = [
    { name: 'Win', value: 70 },
    { name: 'Lose', value: 20 },
    { name: 'Draw', value: 10 },
  ];

  // 승리, 패배, 무승부의 컬러
  const colors = ['#0074CC', '#FF4136', '#000000'];

  // 차트 제목
  const chartTitleStyle = {
    color: '#001F3F', // 연한 네이비색
    fontSize: '18px',
    fontWeight: 'bold',
  };

  // "POWER" 글자색
  const powerStyle = {
    color: '#FF4136', // 연한 빨간색
  };

  // 차트 부제목
  const subTitleStyle = {
    color: '#001F3F', // 연한 네이비색
    fontSize: '16px',
  };

  // 차트에 보이는 퍼센트 값을 직접 계산하여 표시하는 함수
  const formatPercent = (value) => `${(value * 100).toFixed(0)}%`;

  return (
    <div className="flex flex-col mt-5 relative h-screen">
      <br />
      <h1 className='ml-5 font-bold'>나의 전적</h1>
      <div className="flex mt-5">
        <div className="flex-1 ml-5">
          <h1 style={chartTitleStyle} className="ml-5 font-bold text-center">
            YOUR <span style={powerStyle}>ARENA</span> GRAPH {/* 차트 제목 */}
          </h1>
          <div className="ml-5 text-center" style={subTitleStyle}>
            20전 14승 2무 4패 {/* 소제목 */}
          </div>
          <ResponsiveContainer width="100%" height={350}> {/* 차트를 반응형으로 감싸는 컨테이너 */}
            {/* PieChart : 원형 차트 모양으로 변환 */}
            <PieChart>
              {/* Tooltip : 마우스를 데이터 포인트 위로 올리면 정보 보여주기 */}
              <Tooltip />
              {/* Pie : 실제 원형 차트 데이터 삽입 */}
              <Pie
                data={data} // 데이터 전달
                cx="50%" // 가로 중앙
                cy="50%" // 세로 중앙
                innerRadius={60} // 내부 반지름
                outerRadius={80} // 외부 반지름ㅈ
                fill="#8884d8" // 차트 색상
                paddingAngle={5} // 각 섹션 사이 간격
                dataKey="value" // 데이터에서 값에 해당하는 키 지정
                label={({ name, percent }) => `${name} ${formatPercent(percent)}`} // 데이터에서의 이름과 퍼센트
              >
                {data.map((entry, index) => (
                  // Cell : 각 섹션의 스타일을 설정하기 위함 -> key는 index값, fill은 컬러 채우기
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 우측 */}
        <div className="flex-1 ml-5">
          <textarea
            className="w-full h-full p-3 border rounded"
            placeholder="최근 겨루었던 상대, 최근 겨루었던 문제 적을 공간"
          />
        </div>
      </div>
    </div>
  );
}