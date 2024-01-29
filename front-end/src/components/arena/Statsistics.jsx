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

  // 최근 겨루었던 문제 데이터 (가상)
  const recentlyData = [
    { id: 1000, name: '두 정수 더하기' },
    { id: 1020, name: '디지털 카운터' },
    { id: 22278, name: '두 최단경로' },
    { id: 30303, name: '알고리즘 문제' },
    { id: 40506, name: '그래프 이론' },
    { id: 55678, name: '동적 프로그래밍' },
  ];

  // 최근 겨루었던 상대 데이터 (가상)
  const recentlyOpponent = [
    { id: 1, name: 'Beemo99' },
    { id: 2, name: '회창일타강사' },
    { id: 3, name: '고양이가 눌렀어요' },
    { id: 4, name: '탑갱안가요' },
    { id: 5, name: '자면서해도이김' },
    { id: 6, name: '세정1234' },
  ]

  // 최근 문제 클릭 이벤트
  const handleProblemClick = (problemId) => {
    // 여기에 클릭한 문제로 이동하는 로직을 추가
    console.log(`최근 겨루었던 문제로 이동 기능 : ${problemId}`);
  };

  // 최근 상대 클릭 이벤트
  const handleOpponentClick = (OpponentId) => {
    console.log(`최근 겨루었던 상대 프로필로 이동 : ${OpponentId}`);
  }

  return (
    <div className="flex flex-col mt-5 mb-5">
      <br />
      <h1 className='ml-5 font-bold'>나의 전적</h1>
      <div className="flex mt-5 w-full">
        <div className="flex-1 ml-5 w-1/3">
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
                outerRadius={80} // 외부 반지름ㅁ
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
        <div className="flex-1 mr-5 w-2/3 max-h-full overflow-y-auto">
          {/* 상단 */}
          <div className="mb-5 text-2xl font-bold">최근 겨루었던 문제</div>
          <div className="flex flex-wrap space-x-2">
            {recentlyData.map((problem) => (
              <div
                key={problem.id}
                className="bg-gray-200 p-2 m-3 rounded-xl cursor-pointer hover:scale-110"
                onClick={() => handleProblemClick(problem.id)}
              >
                {`#${problem.id} ${problem.name}`}
              </div>
            ))}
          </div>

          {/* 하단 */}
          <div className="mt-5 mb-5 text-2xl font-bold">최근 겨루었던 상대</div>
          <div className="flex flex-wrap space-x-2">
            {recentlyOpponent.map((opponent) => (
              <div
                key={opponent.id}
                className="bg-gray-200 p-2 m-1 rounded-xl cursor-pointer hover:scale-110"
                onClick={() => handleOpponentClick(opponent.id)}
              >
                {`${opponent.name}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}