import { useCustomerPurchasesQuery } from '@/query/useCustomerPurchasesQuery'
import { Customer } from '@/types'
import styles from './CustomerDetail.module.css'
import { comma, formatDateDisplay } from '@/utils'

const CustomerDetail = ({ customer }: { customer: Customer }) => {
  const { data, isFetching, isError, refetch } = useCustomerPurchasesQuery(customer.id)

  return (
    <div className={styles.container}>
      <h3>{customer.name}님의 구매 내역</h3>
      {isFetching ? (
        <div>로딩 중...</div>
      ) : isError ? (
        <div>
          불러올 수 없습니다. <button onClick={() => refetch()}>다시 시도</button>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>날짜</th>
              <th>썸네일</th>
              <th>제품명</th>
              <th>단가</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length === 0 && (
              <tr>
                <td colSpan={5}>구매 내역이 없습니다.</td>
              </tr>
            )}
            {Array.isArray(data) &&
              data.map((p, idx: number) => (
                <tr key={idx}>
                  <td>{formatDateDisplay(p.date)}</td>
                  <td>{p.imgSrc ? <img src={p.imgSrc} alt={p.product} className={styles.thumb} /> : '—'}</td>
                  <td>{p.product}</td>
                  <td>{comma(p.price)}원</td>
                  <td>{comma(p.quantity)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CustomerDetail
