import { render, screen } from '@testing-library/react'
import CustomerList from '../CustomerList'
import { vi } from 'vitest'

vi.mock('../../query/useCustomersQuery', () => ({
  useCustomersQuery: () => ({
    data: { data: [{ id: 1, name: '있는이름', count: 3, totalAmount: 90000 }], pagination: { page: 1, totalPages: 1 } },
    isSuccess: true,
    isFetching: false,
    isError: false,
    refetch: vi.fn(),
  }),
}))
import { describe, it } from 'vitest'

describe('CustomerList', () => {
  it('고객 목록 검색 기능을 확인합니다. (있는 이름)', async () => {
    render(<CustomerList dateRange={{ from: '2025-10-01', to: '2025-12-31' }} />)

    expect(screen.getByText('있는이름')).toBeInTheDocument()
    expect(screen.getByText('90,000원')).toBeInTheDocument()
  })
})
