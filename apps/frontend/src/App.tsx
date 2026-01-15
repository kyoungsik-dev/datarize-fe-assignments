import { useState } from 'react'
import { DEFAULT_DATE_RANGE } from '@/utils'
import DateRangePicker from '@/components/DateRangePicker'
import './App.css'

function App() {
  // 날짜 범위 상태
  const [checkDateRange, setCheckDateRange] = useState(true)
  const [dateRange, setDateRange] = useState({
    from: DEFAULT_DATE_RANGE.from,
    to: DEFAULT_DATE_RANGE.to,
  })

  // 선택된 고객 ID (사이드 패널용)
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

  return (
    <div className="app">
      <header className="app-header">
        <h1>쇼핑몰 구매 데이터 대시보드</h1>
      </header>

      <main className="app-main">
        <section>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            기간 선택
            <label style={{ fontWeight: 400, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <input
                type="checkbox"
                checked={checkDateRange}
                onChange={(e) => setCheckDateRange(e.target.checked)}
                style={{ marginRight: 4 }}
              />
              사용
            </label>
          </h2>
          {checkDateRange && <DateRangePicker from={dateRange.from} to={dateRange.to} onChange={setDateRange} />}
          {!checkDateRange && <div>전체 기간을 조회합니다.</div>}
        </section>
        <section>
          <h2>가격대별 구매 빈도</h2>

          {/* 구매빈도 */}
          <div className="placeholder">테이블 영역</div>
        </section>

        <section>
          <h2>고객 목록</h2>

          {/* 고객 목록 */}
          <div className="placeholder">고객 목록 영역</div>
        </section>
      </main>

      {/* CustomerDetailPanel 사이드 패널 */}
      {selectedCustomerId && (
        <aside className="side-panel">
          <div className="side-panel-header">
            <h3>고객 상세 구매 내역</h3>
            <button onClick={() => setSelectedCustomerId(null)}>닫기</button>
          </div>
          <div className="side-panel-content">
            {/* 고객 상세 */}
            <div className="placeholder">고객 ID: {selectedCustomerId}</div>
          </div>
        </aside>
      )}
    </div>
  )
}

export default App
