import React from "react";
import CompResultInfo from './CompResultInfo';
import CompResultTop from './CompResultTop';

export default function CompResult() {

  return (
    <div>
      {/* 경쟁전 결과 상단 */}
      <div>
        <CompResultTop />
      </div>
      {/* 경쟁전 결과 하단 */}
      <div>
        <CompResultInfo />
      </div>

    </div>
  );
}