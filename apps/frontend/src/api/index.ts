import { fetchApi } from './client'
import type {
  PurchaseFrequency,
  Purchase,
  CustomersResponse,
  CustomerPurchase,
  DateRangeParams,
  CustomersParams,
} from '@/types'

type ApiParams = Record<string, string | number | undefined>
// 가격대별 구매 빈도 조회
export async function getPurchaseFrequency(params: DateRangeParams = {}): Promise<PurchaseFrequency[]> {
  return fetchApi<PurchaseFrequency[]>('/purchase-frequency', params as ApiParams)
}

// CSV 추출용 구매 데이터 조회
export async function getPurchases(params: DateRangeParams = {}): Promise<Purchase[]> {
  return fetchApi<Purchase[]>('/purchases', params as ApiParams)
}

// 고객 목록 조회 (페이지네이션)
export async function getCustomers(params: CustomersParams = {}): Promise<CustomersResponse> {
  return fetchApi<CustomersResponse>('/customers', params as ApiParams)
}

// 특정 고객의 상세 구매 내역 조회
export async function getCustomerPurchases(
  customerId: number,
  params: DateRangeParams = {},
): Promise<CustomerPurchase[]> {
  return fetchApi<CustomerPurchase[]>(`/customers/${customerId}/purchases`, params as ApiParams)
}
