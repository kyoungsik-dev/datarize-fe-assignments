import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomerDetail from '../CustomerDetail'
import { describe, it, vi } from 'vitest'
import { act } from 'react'

vi.mock('../../query/useCustomerPurchasesQuery', () => ({
  useCustomerPurchasesQuery: () => ({
    data: [{ date: '2025-10-01', product: '니트', price: 30000, quantity: 1, imgSrc: '' }],
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  }),
}))

describe('CustomerDetail', () => {
  it('고객 상세 구매 내역 기능을 확인합니다.', () => {
    const customer = { id: 1, name: '최경식', count: 1, totalAmount: 30000 }
    act(() => {
      render(<CustomerDetail customer={customer} />)
    })
    expect(screen.getByText('최경식님의 구매 내역')).toBeInTheDocument()
    expect(screen.getByText('니트')).toBeInTheDocument()
    expect(screen.getByText('30,000원')).toBeInTheDocument()
  })
})
