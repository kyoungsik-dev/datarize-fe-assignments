import { getPurchaseFrequency, getPurchases } from '@/api'
import { Purchase, DateRangeParams } from '@/types'
import { convertToCSV, downloadCSV } from '@/utils/csv'
import { comma } from '@/utils/number'
import { useFetchApi } from '@/hooks/useFetchApi'
import styles from './PurchaseFrequencyTable.module.css'

const LoadingDisplay = () => (
  <tr>
    <td colSpan={2} className={styles.loadingCell}>
      로딩 중...
    </td>
  </tr>
)

const ErrorDisplay = ({ onRetry }: { onRetry: () => void }) => (
  <tr>
    <td colSpan={2} className={styles.errorCell}>
      <div>데이터를 불러올 수 없습니다.</div>
      <button onClick={onRetry} className={styles.retryButton}>
        다시 시도
      </button>
    </td>
  </tr>
)

const TableRow = ({ range, count }: { range: string; count: number }) => {
  const [start, end] = range.split(' - ')
  return (
    <tr>
      <td>
        {start === '0' ? '' : `${comma(start)}원`} ~ {end === 'Infinity' ? '' : `${comma(end)}원`}
      </td>
      <td>{comma(count)}</td>
    </tr>
  )
}

const PurchaseFrequencyTable = ({ dateRange }: { dateRange: DateRangeParams }) => {
  const { data, loading, error, refetch } = useFetchApi(getPurchaseFrequency, dateRange, [dateRange.from, dateRange.to])

  const handleDownloadCSV = async () => {
    try {
      const purchases: Purchase[] = await getPurchases(dateRange)
      const csv = convertToCSV(purchases)
      downloadCSV(csv, '구매내역.csv')
    } catch {
      alert('CSV 다운로드에 실패했습니다.')
    }
  }

  return (
    <div>
      <div className={styles.tableActions}>
        <button onClick={handleDownloadCSV}>CSV 다운로드</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>가격대</th>
            <th>구매 빈도</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <LoadingDisplay />
          ) : error ? (
            <ErrorDisplay onRetry={refetch} />
          ) : (
            data!.map((row) => <TableRow key={row.range} range={row.range} count={row.count} />)
          )}
        </tbody>
      </table>
    </div>
  )
}

export default PurchaseFrequencyTable
