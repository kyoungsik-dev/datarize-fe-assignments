import { useState, useEffect } from 'react'
import { useCustomersQuery } from '@/query/useCustomersQuery'
import { CustomersParams, Customer } from '@/types'
import { comma } from '@/utils/number'
import styles from './CustomerList.module.css'

interface CustomerListProps {
  dateRange: { from?: string; to?: string }
  onRowClick?: (customer: Customer) => void
}

const PAGE_LIMIT = 10

const CustomerList = ({ dateRange, onRowClick }: CustomerListProps) => {
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | undefined>(undefined)
  const [search, setSearch] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [page, setPage] = useState(1)

  // dateRange 변경 시 정렬, 검색, 페이지 초기화
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSortBy(undefined)
    setSearch('')
    setInputValue('')
    setPage(1)
  }, [dateRange.from, dateRange.to])

  const params: CustomersParams = {
    from: dateRange.from,
    to: dateRange.to,
    sortBy,
    name: search || undefined,
    page,
    limit: PAGE_LIMIT,
  }

  const { data, isSuccess, isFetching, isError, refetch } = useCustomersQuery(params)
  const handleSearch = () => {
    setSearch(inputValue)
    setPage(1)
  }

  return (
    <div>
      <div className={styles.controls}>
        <div>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="이름 검색"
            value={inputValue}
            onChange={(e) => {
              const v = e.target.value
              setInputValue(v)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
          <button onClick={() => handleSearch}>조회</button>
        </div>
        <div className={styles.sortButtons}>
          정렬
          <button className={!sortBy ? styles.active : ''} onClick={() => setSortBy(undefined)}>
            기본
          </button>
          <button className={sortBy === 'asc' ? styles.active : ''} onClick={() => setSortBy('asc')}>
            금액 ⬆️
          </button>
          <button className={sortBy === 'desc' ? styles.active : ''} onClick={() => setSortBy('desc')}>
            금액 ⬇️
          </button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>구매 횟수</th>
            <th>총 구매 금액</th>
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            <tr>
              <td colSpan={4} className={styles.loading}>
                로딩 중...
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={4} className={styles.error}>
                데이터를 불러올 수 없습니다. <button onClick={() => refetch()}>다시 시도</button>
              </td>
            </tr>
          ) : isSuccess && data.data.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.empty}>
                검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            isSuccess &&
            data!.data.map((customer) => (
              <tr key={customer.id} onClick={() => onRowClick?.(customer)} className={styles.row}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{comma(customer.count)}</td>
                <td>{comma(customer.totalAmount)}원</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {data?.data && data.data.length > 0 && (
        <div className={styles.pagination}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || isFetching}>
            이전
          </button>
          <span>
            {data?.pagination.page ?? 1} / {data?.pagination.totalPages ?? 1}
          </span>
          <button
            onClick={() =>
              setPage((p) => (data?.pagination.totalPages ? Math.min(data.pagination.totalPages, p + 1) : p + 1))
            }
            disabled={isFetching || (data && data.pagination.page === data.pagination.totalPages)}
          >
            다음
          </button>
        </div>
      )}
    </div>
  )
}

export default CustomerList
