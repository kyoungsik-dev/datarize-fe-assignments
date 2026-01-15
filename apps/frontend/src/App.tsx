import { useState } from 'react'
import { DEFAULT_DATE_RANGE } from '@/utils'
import DateRangePicker from '@/components/DateRangePicker'
import PurchaseFrequencyTable from '@/components/PurchaseFrequencyTable'
import styles from './App.module.css'

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
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1 className={styles.appHeaderTitle}>쇼핑몰 구매 데이터 대시보드</h1>
      </header>

      <main className={styles.appMain}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            기간 선택
            <label className={styles.dateRangeLabel}>
              <input type="checkbox" checked={checkDateRange} onChange={(e) => setCheckDateRange(e.target.checked)} />
              사용
            </label>
          </h2>
          {checkDateRange && <DateRangePicker from={dateRange.from} to={dateRange.to} onChange={setDateRange} />}
          {!checkDateRange && <div>전체 기간을 조회합니다.</div>}
        </section>
        <div>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>가격대별 구매 빈도</h2>
            <PurchaseFrequencyTable dateRange={dateRange} />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>고객 목록</h2>

            {/* 고객 목록 */}
            <div className={styles.placeholder}>고객 목록 영역</div>
          </section>
        </div>
      </main>

      {/* CustomerDetailPanel 사이드 패널 */}
      {selectedCustomerId && (
        <aside className={styles.sidePanel}>
          <div className={styles.sidePanelHeader}>
            <h3 className={styles.sidePanelHeaderTitle}>고객 상세 구매 내역</h3>
            <button className={styles.sidePanelHeaderButton} onClick={() => setSelectedCustomerId(null)}>
              닫기
            </button>
          </div>
          <div className={styles.sidePanelContent}>
            {/* 고객 상세 */}
            <div className={styles.placeholder}>고객 ID: {selectedCustomerId}</div>
          </div>
        </aside>
      )}
    </div>
  )
}

export default App
