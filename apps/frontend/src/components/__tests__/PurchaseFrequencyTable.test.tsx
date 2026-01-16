import { render, screen } from '@testing-library/react'
import PurchaseFrequencyTable from '../PurchaseFrequencyTable'
import { describe, it, vi } from 'vitest'

vi.mock('../../query/usePurchaseFrequencyQuery', () => ({
  usePurchaseFrequencyQuery: () => ({
    data: [
      { range: '0 - 20000', count: 10 },
      { range: '20001 - 30000', count: 5 },
    ],
    isSuccess: true,
    isFetching: false,
    isError: false,
    isPaused: false,
    refetch: vi.fn(),
  }),
}))

describe('PurchaseFrequencyTable', () => {
  it('구매 빈도 테이블을 확인합니다.', () => {
    render(<PurchaseFrequencyTable dateRange={{ from: '2025-10-01', to: '2025-12-31' }} />)
    expect(screen.getByText(/20,000원/)).toBeInTheDocument()
    expect(screen.getByText(/10/)).toBeInTheDocument()
  })
})
